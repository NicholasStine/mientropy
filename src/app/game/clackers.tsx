"use client"
import { revealNearby } from "./neighbors"
import { SAD_FACE, HAPPY_FACE, COOL_FACE, ROWS, COLUMNS, MINE_COUNT, MINES } from "./constants"
import { collectProbs } from "./probabilitawh"

// handles all mouse left and right clicky clackers

export function onTileClick(e: MouseEvent, _tiles: any[], updateFace: Function, getFailed: Function, setFailed: Function, addRevealed: Function) {
    const _failed = getFailed()
    if (_failed) return
    // @ts-ignore
    const { tileI: i, tileJ: j, isBomb, nearby } = e.target
    const td = _tiles[COLUMNS * i + j]
    if (!td) throw new Error('Tile not found')
    const already_flagged = td.className.includes('flag')
    if (already_flagged) return
    const revealed_tile: string = isBomb ? 'bomb-red' : MINES[nearby]
    if (td.className.includes('unknown')) addRevealed()
    td.className = `tile ${revealed_tile}`
    if (isBomb) return onBombClick(_failed, updateFace, setFailed)
    revealNearby(i, j, addRevealed, true, _tiles as never[])

    collectProbs(_tiles)
}

export function onTileFlag(e: MouseEvent, _tiles: any[], getFailed: Function, updateFlagged: Function) {
    e.preventDefault()
    const _failed = getFailed()
    if (_failed) return
    // @ts-ignore
    const { tileI: i, tileJ: j, isBomb, nearby } = e.target
    const td = _tiles[COLUMNS * i + j]
    if (!td) throw new Error('Tile not found')
    const already_revealed = !td.className.includes('unknown')
    const already_flagged = td.className.includes('flag')
    if (already_revealed && !already_flagged) return
    td.className = already_flagged ? 'tile unknown' : 'tile flag'
    updateFlagged(already_flagged ? -1 : 1)
}

export function onBombClick(_failed: boolean, updateFace: Function, setFailed: Function) {
    // _failed = true
    setFailed()
    updateFace(SAD_FACE)
}

export function onFaceClick(e: any, initializeGame: Function) {
    initializeGame()
    updateFace(HAPPY_FACE)
}

export function updateFace(new_face: string) {
    const face = document.querySelector('div.face')
    if (!face) throw new Error("Face Button Not Found")
    face.className = `face ${new_face}`
}