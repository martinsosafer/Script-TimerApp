import WordsSorter from "./wordsSorter";

export default function WordsSorterPage() {
  return (
    <div className="flex w-[1024px] flex-col items-center">
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
      <div className="mb-20 p-4">
        <p className="mt-4">
          Are you looking for a tool to help you quickly and easily sort lists
          of words or phrases? If so, our Word Sorter tool is just what you
          need. With the ability to separate items by line, comma, or space, and
          the option to sort them in ascending or descending alphabetical order,
          our tool is designed to make sorting a breeze.
        </p>
        <p className="mt-4">
          Simply paste your text into the tool or type it directly into the
          interface, select your preferred separation method and sorting order,
          and the Word Sorter will do the rest. You can even choose to remove
          duplicates or ignore certain words, depending on your needs.
        </p>
        <p className="mt-4">
          Using this tool can save you time and effort in the proofreading
          process, allowing you to focus on other aspects of your work.
          Additionally, it can help you avoid errors that can make your text
          look unprofessional or disorganized.
        </p>
        <p className="mt-4">
          We’re always looking for ways to improve our tools and make them more
          useful for our users. If you have any suggestions for new features or
          improvements to the Word Sorter tool, please don’t hesitate to let us
          know. You can reach us through the “Suggest a Feature” link or by
          contacting us directly.
        </p>
      </div>
    </div>
  );
}
