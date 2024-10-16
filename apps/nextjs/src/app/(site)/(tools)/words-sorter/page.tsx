import WordsSorter from "./wordsSorter";

export default function WordsSorterPage() {
  return (
    <div className="flex w-[1000px] flex-col items-center">
      <div className="my-8 flex w-full flex-col items-center">
        <h2 className="text-4xl font-bold text-primary">
          Sort Words in Alphabetical Order
        </h2>
        <p className="mt-2 w-[600px] text-center text-lg">
          Sort your words in alphabetical order quickly and easily with Word
          Sorter, a free online tool perfect for students and writers. Simply
          copy and paste your list of words and let the tool do the rest,
          allowing you to organize your writing with ease.
        </p>
      </div>
      <WordsSorter />
    </div>
  );
}
