"use client"

import Image from "next/image";
import { useEffect } from "react";

let force_update = 0
const ROWS = 10
const COLUMNS = 10
const MINE_COUNT = 20
const MINES = [
  'blank',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  'flag',
  'flag-red',
  'bomb',
  'bomb-red',
  'unknown'
]

export default function Home() {
  let indicies: any[] = []
  let tiles: any[] = []
  
  function onTileClick(e: MouseEvent) {
    // @ts-ignore
    const { tileI: i, tileJ: j, isBomb, nearby } = e.target
    const td = tiles[COLUMNS * i + j]
    if (!td) throw new Error('Tile not found')
    const revealed_tile = isBomb ? 'bomb' : MINES[nearby]
    td.className = `tile ${revealed_tile}`
    revealNearby(i, j)
  }

  function countNearby(tile_i: number, tile_j: number) {
    let nearby_count = 0
    for (let i = Math.max(0, tile_i - 1); i <= Math.min(ROWS - 1, tile_i + 1); i++) {
      for (let j = Math.max(0, tile_j - 1); j <= Math.min(COLUMNS - 1, tile_j + 1); j++) {
        const adjacent_td = tiles[COLUMNS * i + j]
        nearby_count += adjacent_td.isBomb ? 1 : 0
      }
    }
    return Math.floor(nearby_count)
  }

  function revealNearby(tile_i: number, tile_j: number, first=true) {
    console.log(`revealNearby(${tile_i}, ${tile_j})`)
    // recursively find and reveal adjacent blank cells and their neighbors
    // 0. Get tile
    const tile = tiles[COLUMNS * tile_i + tile_j]
    const { isBomb, nearby, className } = tile
    
    // 1. Quit if outside bounds, if already revealed (not unknown), or if it's a mine
    const out_of_bounds = tile_i < 0 || tile_i > ROWS || tile_j < 0 || tile_j > COLUMNS
    const is_revealed = first ? false : !(className as string).includes('unknown')
    if (isBomb || out_of_bounds || is_revealed) return
    
    // 2. Reveal that muthafucka
    const new_mineeeee = `tile ${MINES[nearby]}`
    tile.className = new_mineeeee
    
    // 3. Quit if not blank (nearby > 0)
    if (nearby > 0) return

    // 4. For all neighbors, call revealNearby(neighbor_i, neighbor_j)
    for (let neighbor_i = Math.max(0, tile_i - 1); neighbor_i <= Math.min(ROWS - 1, tile_i + 1); neighbor_i++) {
      for (let neighbor_j = Math.max(0, tile_j - 1); neighbor_j <= Math.min(COLUMNS - 1, tile_j + 1); neighbor_j++) {
        revealNearby(neighbor_i, neighbor_j, false)
      }
    }
  }

  function initializeGrid() {
    // load and refresh the minesweeper grid
    let grid = document.querySelectorAll('.minesweeper-grid')[0]
    let new_grid = document.createElement('tbody')
    new_grid.className = 'minesweeper-grid'
    grid.replaceWith(new_grid)
    grid = document.querySelectorAll('.minesweeper-grid')[0]
    
    // Loop through the rows and columns to add each tile
    for (let i = 0; i < ROWS; i++) {
      const row = document.createElement('tr')
      for (let j = 0; j < COLUMNS; j++) {
        indicies.push([i,j])
        // Setup each tile's class, onclick, and (i,j) attributes
        const td = document.createElement('td')
        td.className = `tile unknown`
        td.onclick = onTileClick
        td.ondragenter = onTileClick
        // @ts-ignore
        td.tileI = i
        // @ts-ignore
        td.tileJ = j

        // Append the new td and tr tags to the tbody.minesweeper-grid tag
        tiles.push(td)
        row.appendChild(td)
      }
      grid.appendChild(row)
    }
    return grid
  }

  function initializeBombs() {
    const bombs = indicies.sort((a, b) => 0.5 - Math.random()).slice(0,MINE_COUNT)
    for (const [i, j] of bombs) {
      // @ts-ignore
      tiles[COLUMNS * i + j].isBomb = true
    }
  }

  function initializeNearbyCounts() {
    for (const tile of tiles) {
      // @ts-ignore
      const { isBomb, tileI: i, tileJ: j } = tile
      const nearby = isBomb ? -1 : countNearby(i, j)
      // @ts-ignore
      tile.nearby = nearby
    }
  }

  function initializeGame() {
    initializeGrid()
    initializeBombs()
    initializeNearbyCounts()
  }

  force_update += 1
  useEffect(() => {
    initializeGame()
  }, [force_update])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid-wrapper">
          <table className="table-fixed">
            <tbody className="minesweeper-grid">
            </tbody>
          </table>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180 / 3}
          height={38 / 3}
          priority
        />
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Nextjs.org →
        </a>
      </footer>
    </div>
  );
}
