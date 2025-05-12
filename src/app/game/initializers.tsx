"use client"

import { onTileClick, onTileFlag, updateFace } from "./clackers"
import { SAD_FACE, HAPPY_FACE, COOL_FACE, ROWS, COLUMNS, MINE_COUNT, MINES } from "./constants"
import { countNearby } from "./nighbors"

// sets up a new game state
export function initializeGrid(indicies: any[], tiles: any[], updateFlagged: Function, getFailed: Function, setFailed: Function, addRevealed: Function) {
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
            indicies.push([i, j])
            // Setup each tile's class, onclick, and (i,j) attributes
            const td = document.createElement('td')
            td.className = `tile unknown`
            td.onclick = (e: MouseEvent) => onTileClick(e, tiles, updateFace, getFailed, setFailed, addRevealed)
            td.ondragenter = (e: MouseEvent) => onTileClick(e, tiles, updateFace, getFailed, setFailed, addRevealed)
            td.oncontextmenu = (e: MouseEvent) => onTileFlag(e, tiles, getFailed, updateFlagged)
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
    return [indicies, tiles]
}

export function initializeBombs(indicies: any[], tiles: any[]) {
    const bombs = indicies.sort((a, b) => 0.5 - Math.random()).slice(0, MINE_COUNT)
    for (const [i, j] of bombs) {
        // @ts-ignore
        tiles[COLUMNS * i + j].isBomb = true
    }
    return [indicies, tiles]
}

export function initializeNearbyCounts(indicies: any[], tiles: any[]) {
    for (const tile of tiles) {
        // @ts-ignore
        const { isBomb, tileI: i, tileJ: j } = tile
        const nearby = isBomb ? -1 : countNearby(i, j, tiles)
        // @ts-ignore
        tile.nearby = nearby
    }
    return [indicies, tiles]
}

export function initializeGame(updateFlagged: Function, getFailed: Function, setFailed: Function, addRevealed: Function) {
    let indicies: any[] = []
    let tiles: any[] = []

    const [g_indicies, g_tiles] = initializeGrid(indicies, tiles, updateFlagged, getFailed, setFailed, addRevealed)
    const [b_indicies, b_tiles] = initializeBombs(g_indicies, g_tiles)
    const [c_indicies, c_tiles] = initializeNearbyCounts(b_indicies, b_tiles)
    indicies = c_indicies
    tiles = c_tiles
}