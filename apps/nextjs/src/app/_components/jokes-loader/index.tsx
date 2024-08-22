import { useEffect, useState } from "react";

import data from "./jokes.json";

const { jokes } = data;

export default function JokesLoader() {
  const [joke, setJoke] = useState<string>(
    "Hey! Here are a few jokes for you while you wait.",
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]!);
    }, 7000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  function parseJoke(joke: string) {
    const lines = joke.split("\n");
    return lines.map((line, index) => (
      <p key={index} className="text-left">
        {line}
      </p>
    ));
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="flex w-[60%] flex-col items-start justify-center text-lg">
        {parseJoke(joke)}
      </p>
    </div>
  );
}
