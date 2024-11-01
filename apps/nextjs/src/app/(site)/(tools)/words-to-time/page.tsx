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
    </div>
  );
}
