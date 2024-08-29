import { useEffect, useState } from "react";

import data from "./jokes.json";

const { jokes } = data;

export default function JokesLoader() {
  const [joke, setJoke] = useState<string>(
    "It takes a few seconds to scan the ‘interwebs’ to make sure your content is original. \n Here are some thoughts to share a smile with you while you wait…",
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]!);
    }, 8000);

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
      <div className="flex min-h-[180px] w-[70%] flex-col items-start justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-200 via-blue-200 to-orange-200 p-6 text-lg ">
        {parseJoke(joke)}
      </div>
    </div>
  );
}
