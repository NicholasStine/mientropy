"use client"
import { ROWS, COLUMNS } from "./constants"

// YOU WILL RESPECT MY PROBABILITAWH!!!
export function collectProbs(tiles: any[]): [number, any] {
    // console.log("indices: ", indices)
    let unselected: any[] = []
    const constraints = tiles
        .filter(({ className }) => /tile [0-9]/.test(className))
        .map(({ nearby: c_j, tileI: i, tileJ: j, className }) => {
            const omega_j = collectOmega(tiles, i, j)
            unselected = [...unselected, ...omega_j]
            return { i, j, c_j, omega_j }
        })
    console.log("constraints: ", constraints)
    const u_set = new Set(unselected.map(([a, b]) => a * COLUMNS + b))
    console.log(u_set)
    const n_unselected = [...u_set].length
    console.log("n unselected: ", n_unselected)
    return [n_unselected, constraints]
}

// collect all indices of neighboring tiles
export function collectOmega(tiles: any[], i: number, j: number) {
    let omega: any[] = []
    // let n_unselected = 0
    for (let neighbor_i = Math.max(0, i - 1); neighbor_i <= Math.min(ROWS - 1, i + 1); neighbor_i++) {
        for (let neighbor_j = Math.max(0, j - 1); neighbor_j <= Math.min(COLUMNS - 1, j + 1); neighbor_j++) {
            const is_unknown = tiles[neighbor_i * COLUMNS + neighbor_j]?.className.includes('unknown')
            const already_counted = omega.includes([neighbor_i, neighbor_j])
            if (is_unknown) {
                omega.push([neighbor_i, neighbor_j])
            }
        }
    }
    return omega
}

// I'm strait up breaking the no AI rule and copying
// this directly from Grok...
// oh well! In defeat we show grace :)

const MAX_ITERATIONS = 10

export function calculateProbabilitawh(tiles: any[]) {
    const [n, constraints] = collectProbs(tiles)
    if (!constraints.length) return
    console.log("N: ", n)

    let p = new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(0.5))
    let q = new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(0.5))

    for (let _ = 0; _ < MAX_ITERATIONS; _++) {
        let old_p = [...p]
        let old_q = [...q]

        // @ts-ignore
        for (const { c_j, omega_j } of constraints) {
            console.log(c_j, omega_j)
            // current_sum_p = sum(p[i] for i in omega_j)
            const current_sum_p = omega_j
                .reduce((sum: number, [i, j]: number[]) => sum + p[i][j], 0)
            // console.log("current_sum_p: ", current_sum_p)
            if (current_sum_p > 0) {
                const factor_p = c_j / current_sum_p
                for (const [i, j] of omega_j) {
                    p[i][j] *= factor_p
                }
            }

            const non_mines = omega_j.length - c_j
            const current_sum_q = omega_j
                .reduce((sum: number, [i, j]: number[]) => sum + q[i][j], 0)
            if (current_sum_q > 0) {
                const factor_q = non_mines / current_sum_q
                for (const [i, j] of omega_j) {
                    q[i][j] *= factor_q
                }
            }
        }

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                const total = p[i][j] + q[i][j]
                if (total > 0) {
                    p[i][j] /= total
                    q[i][j] /= total
                }
            }
        }
    }

    console.log(p)
    console.log(q)
    // now that I have p and q, I need to use p to 
    // alter the filter css property, 
    // where green is hue-rotate(50deg) saturate(300%);
    // and   red   is hue-rotate(250deg) saturate(300%);

    console.log(tiles)
    // I'm just going to raw loop strait through dis bitch
    for (const [row_i, row] of p.entries()) {
        for (const [col_i, col] of row.entries()) {
            if (tiles[row_i * COLUMNS + col_i]?.className?.includes('unknown')) {
                // console.log("GOT ONE!")
                const p_val = p[row_i][col_i]
                // console.log(p_val)
                const hue = p_val <= 0.5 ? 45 : 215
                let grayscale = (1 - (p_val <= 0.5 ? (1 - p_val) : (0.5 - (0.5 - p_val)))) * 100
                if (grayscale == 50) grayscale = 100
                tiles[row_i * COLUMNS + col_i].style.filter = `hue-rotate(${hue}deg) grayscale(${grayscale}%)`
            } else {
                tiles[row_i * COLUMNS + col_i].style.filter = ``
            }
        }
    }
}