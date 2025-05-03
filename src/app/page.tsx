import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid-wrapper">
          <table className="table-fixed">
            <tbody className="">
              <tr className="">
                <td className="tile 1"></td>
                <td className="tile 2"></td>
                <td className="tile 3"></td>
                <td className="tile 4"></td>
                <td className="tile 5"></td>
                <td className="tile 6"></td>
                <td className="tile 7"></td>
                <td className="tile blank"></td>
                <td className="tile bomb"></td>
                <td className="tile bomb-red"></td>
                <td className="tile flag"></td>
                <td className="tile flag-red"></td>
                <td className="tile unknown"></td>
              </tr>
              <tr className="">
                <td className="tile 1"></td>
                <td className="tile 2"></td>
                <td className="tile 3"></td>
                <td className="tile 4"></td>
                <td className="tile 5"></td>
                <td className="tile 6"></td>
                <td className="tile 7"></td>
                <td className="tile blank"></td>
                <td className="tile bomb"></td>
                <td className="tile bomb-red"></td>
                <td className="tile flag"></td>
                <td className="tile flag-red"></td>
                <td className="tile unknown"></td>
              </tr>
              <tr className="">
                <td className="tile 1"></td>
                <td className="tile 2"></td>
                <td className="tile 3"></td>
                <td className="tile 4"></td>
                <td className="tile 5"></td>
                <td className="tile 6"></td>
                <td className="tile 7"></td>
                <td className="tile blank"></td>
                <td className="tile bomb"></td>
                <td className="tile bomb-red"></td>
                <td className="tile flag"></td>
                <td className="tile flag-red"></td>
                <td className="tile unknown"></td>
              </tr>
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
