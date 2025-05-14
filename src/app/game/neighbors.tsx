"use client"

import { SAD_FACE, HAPPY_FACE, COOL_FACE, ROWS, COLUMNS, MINE_COUNT, MINES } from "./constants"

// handles counting bombs and recursive revealing of neighboring tiles

let tiles: any[] = []

// recursively find and reveal adjacent blank cells and their neighbors
export function revealNearby(tile_i: number, tile_j: number, addRevealed: Function, first = true, _tiles = []) {
  // -1. cache the latest tiles
  if (first) tiles = _tiles
  // 0. Get tile
  const tile = tiles[COLUMNS * tile_i + tile_j]
  const { isBomb, nearby, className } = tile

  // 1. Quit if outside bounds, if already revealed (not unknown), or if it's a mine
  const out_of_bounds = tile_i < 0 || tile_i > ROWS || tile_j < 0 || tile_j > COLUMNS
  const is_revealed = first ? false : !(className as string).includes('unknown')
  if (isBomb || out_of_bounds || is_revealed) return

  // 2. Reveal that muthafucka
  const new_mineeeee = `tile ${MINES[nearby]}`
  console.log(className as string)
  console.log((className as string).includes('unknown'))
  if ((className as string).includes('unknown')) addRevealed()
  tile.className = new_mineeeee
  console.log("NEEEEAAARRRRR?!?!?!?!?!!!!")

  // 3. Quit if not blank (nearby > 0)
  if (nearby > 0) return

  // 4. For all neighbors, call recurse
  for (let neighbor_i = Math.max(0, tile_i - 1); neighbor_i <= Math.min(ROWS - 1, tile_i + 1); neighbor_i++) {
    for (let neighbor_j = Math.max(0, tile_j - 1); neighbor_j <= Math.min(COLUMNS - 1, tile_j + 1); neighbor_j++) {
      revealNearby(neighbor_i, neighbor_j, addRevealed, false)
    }
  }

  // 5. on final return, clear cached tiles
  if (first) tiles = []
}



export function countNearby(tile_i: number, tile_j: number, tiles: any[]) {
  let nearby_count = 0
  for (let i = Math.max(0, tile_i - 1); i <= Math.min(ROWS - 1, tile_i + 1); i++) {
    for (let j = Math.max(0, tile_j - 1); j <= Math.min(COLUMNS - 1, tile_j + 1); j++) {
      const adjacent_td = tiles[COLUMNS * i + j]
      nearby_count += adjacent_td.isBomb ? 1 : 0
    }
  }
  return Math.floor(nearby_count)
}