export const calculateLength = (input: string) => {
  const wordCount = (input.length ?? 0) / 7;

  const seconds = wordCount / 150;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  console.log("MINUTSE", input.length, wordCount, minutes, remainingSeconds);
  // Padding zero if remaining seconds is less than 10
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return `Your script is ${wordCount} words. We estimate a recording of it would be ${minutes} minutes and ${formattedSeconds} seconds.`;
};
