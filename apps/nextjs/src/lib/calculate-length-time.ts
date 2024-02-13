function countWords(inputString = "") {
  // Remove leading and trailing white spaces from the string
  const trimmedString = inputString.trim();

  // Split the string into an array of words using space as a delimiter
  const wordsArray = trimmedString.split(" ");

  // Filter out any empty strings from the array
  const filteredWordsArray = wordsArray.filter((word) => word !== "");

  // Return the length of the filtered array which gives the count of words
  return filteredWordsArray.length;
}

export const calculateLengthtTime = (input: string) => {
  const wordCount = countWords(input);

  const seconds = wordCount / 2;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  console.log("MINUTSE", input.length, wordCount, minutes, remainingSeconds);
  // Padding zero if remaining seconds is less than 10
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return { wordCount, minutes, formattedSeconds };
};
