function countWords(inputString = "") {
  const trimmedString = inputString.trim();

  const wordsArray = trimmedString.split(" ");

  const filteredWordsArray = wordsArray.filter((word) => word !== "");

  return filteredWordsArray.length;
}

export const calculateLengthTime = (input) => {
  const wordCount = countWords(input);

  const seconds = wordCount / 2.5;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toFixed(0);

  let speedCategory = "";
  if (minutes < 1) {
    speedCategory = "Fast:";
  } else if (minutes >= 1 && minutes < 2) {
    speedCategory = "Average:";
  } else {
    speedCategory = "Slow:";
  }

  return { wordCount, minutes, formattedSeconds, speedCategory };
};
