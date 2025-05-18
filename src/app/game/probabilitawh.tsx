"use client"
import { ROWS, COLUMNS } from "./constants"

// YOU WILL RESPECT MY PROBABILITAWH!!!
export function collectProbs(tiles: any[]) {
    // console.log("indicies: ", indicies)
    let unselected: any[] = []
    const constraints = tiles
        .filter(({ className }) => /tile [0-9]/.test(className))
        .map(({ nearby: c_j, tileI: i, tileJ: j, className }) => {
            const omega_j = collectOmega(tiles, i, j)
            unselected = [...unselected, ...omega_j]
            return { i, j, c_j, omega_j }
        })
    console.log("tiles: ", constraints)
    const u_set = new Set(unselected.map(([a, b]) => a * COLUMNS + b))
    const n_unselected = [...u_set].length
    // const n_unselected = [...u_set].map((_, i) => i)
    console.log("n unselected: ", n_unselected)
}

// collect all indicies of neighboring tiles
export function collectOmega(tiles: any[], i: number, j: number) {
    let omega: any[] = []
    // let n_unselected = 0
    for (let neighbor_i = Math.max(0, i - 1); neighbor_i <= Math.min(ROWS - 1, i + 1); neighbor_i++) {
        for (let neighbor_j = Math.max(0, j - 1); neighbor_j <= Math.min(COLUMNS - 1, j + 1); neighbor_j++) {
            const is_unknown = tiles[neighbor_i * COLUMNS + neighbor_j]?.className.includes('unknown')
            const already_counted = omega.includes([neighbor_i, neighbor_j])
            if (is_unknown) {
                omega.push([neighbor_i, neighbor_j])
                // if (!already_counted) {
                //     // n_unselected++
                // }
            }
        }
    }
    return omega
}