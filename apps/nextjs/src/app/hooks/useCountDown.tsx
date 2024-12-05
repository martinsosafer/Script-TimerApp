import { useEffect, useState } from "react";

export const useCountdown = (
  setCountdown: React.Dispatch<React.SetStateAction<number>>,
) => {
  const startCountdown = () => {
    setCountdown(3); // Reset countdown to 3
    let countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(countdownTimer); // Clear the interval when it reaches 1
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000); // Countdown every second
  };

  return { startCountdown };
};
