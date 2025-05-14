"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Counter from "./components/counter";
import { SAD_FACE, HAPPY_FACE, COOL_FACE, ROWS, COLUMNS, MINE_COUNT, MINES } from "./game/constants"
import { initializeGame } from "./game/initializers";
import { onFaceClick, updateFace } from "./game/clackers";
// let force_update = 0

export default function Home() {
  let finished: boolean = false
  let flagged: number = 0
  let revealed: number = 0

  const [flaggedState, setFlaggedState] = useState(0)
  function updateFlagState(change: number) {
    flagged = Math.min(flagged + change, MINE_COUNT)
    setFlaggedState(flagged)
  }

  const [failedState, setFailedState] = useState(false)
  function updateFailedState() {
    finished = true
  }

  function updateRevealedState() {
    revealed += 1
    const possible = COLUMNS * ROWS - MINE_COUNT
    console.log("POSSIBLE: ", possible)
    console.log("REVEALED: ", revealed)
    console.log
    if (revealed >= possible) {
      finished = true
      updateFace(COOL_FACE)
    }
  }

  function resetGame() {
    flagged = 0
    finished = false
    setFlaggedState(0)
    // setFailedState(false)
    return () => initializeGame((change: number) => updateFlagState(change), () => finished, updateFailedState, updateRevealedState)
  }

  // force_update += 1
  useEffect(() => {
    initializeGame((change: number) => updateFlagState(change), () => finished, updateFailedState, updateRevealedState)
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="minesweeper-board flex flex-col gap-[40px]">
          <div className="w-full flex flex-row justify-between">
            <Counter count={MINE_COUNT - flaggedState} />
            <div onClick={(e) => onFaceClick(e, resetGame())} className="face happy"></div>
            <Counter count={260} />
          </div>
          <div className="grid-wrapper">
            <table className="table-fixed">
              <tbody className="minesweeper-grid">
              </tbody>
            </table>
          </div>
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
