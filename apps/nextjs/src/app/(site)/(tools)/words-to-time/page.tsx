import TimeCalculator from "./timeCalculator";

export default function Page() {
  return (
    <div className="flex w-[1000px] flex-col items-center">
      <div className="my-8 flex w-full flex-col items-center">
        <h2 className="text-4xl font-bold text-primary">
          Words to Time Calculator
        </h2>
        <p className="mt-2 w-[600px] text-center text-lg">
          Script timer instantly estimates your script time in minutes and
          seconds. But there is more: Use a specialized Ai to listen, edit,
          rewrite, and improve your scripts. Character, word, & page count. Word
          density & sorting. Hemingway grading. Try them all.
        </p>
      </div>
      <TimeCalculator />
      <div className="mb-20 p-4">
        <p className="mt-4">
          Word & Character Counter tool is a simple, yet powerful, online
          calculator that lets you quickly and easily determine the character
          and word count of your writing. This tool is a game-changer for anyone
          who needs to keep track of their writing’s length, whether you’re a
          student working on an essay, a blogger trying to hit a specific word
          count or a social media user who needs to stay within a character
          limit.
        </p>
        <p className="mt-4">
          This tool is incredibly easy to use – simply copy and paste your text
          into the text area or type directly into the tool, and it will
          immediately provide you with an accurate character and word count.
          This can be especially helpful if you’re working on a project with
          specific length requirements or submitting work to a publication with
          strict guidelines.
        </p>
        <p className="mt-4">
          One of the best things about Word & Character Counter is its speed –
          it provides you with the character and word count almost instantly, so
          you don’t have to waste any time waiting for results. This makes it an
          incredibly efficient tool for anyone who needs to check their
          writing’s length on the fly.
        </p>
        <p className="mt-4">
          One of the best things about Word & Character Counter is its speed –
          it provides you with the character and word count almost instantly, so
          you don’t have to waste any time waiting for results. This makes it an
          incredibly efficient tool for anyone who needs to check their
          writing’s length on the fly.
        </p>
      </div>
    </div>
  );
}
