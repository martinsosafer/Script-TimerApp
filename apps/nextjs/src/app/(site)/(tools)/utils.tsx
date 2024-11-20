import { getComplexWords } from "./grade-level/grader/utils";

function getRandomCheer() {
  const cheers = [
    "Great job Shakespeare!",
    "Well hello, James Joyce! That's a great script!",
    "We got ourselves a Hemingway here!",
    "Is that JK Rowling?! Nice going!",
    "Dostoevsky is here folks! Look at that script!",
    "Is that Voltaire?? Well done!",
    "T.S. Eliot anyone?? What a script!",
    "How Orwellian of you to input! Nicely done",
    "Is that a Swiftâ€™s sick beat? So goood!",
  ];
  return cheers[Math.floor(Math.random() * cheers.length)];
}

export function calculateTime(text: string, speed: number) {
  const wordsCount = text.trim().split(/\s+/).length;
  const seconds = Math.ceil(wordsCount / speed);

  if (seconds <= 60) {
    return {
      title: getRandomCheer(),
      words: wordsCount,
      seconds: seconds,
      minutes: null,
      speed: speed,
    };
  } else if (seconds % 60 === 0) {
    const minutes = seconds / 60;

    return {
      title: getRandomCheer(),
      words: wordsCount,
      seconds: null,
      minutes: minutes,
      speed: speed,
    };
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return {
      title: getRandomCheer(),
      words: wordsCount,
      seconds: secs,
      minutes: mins,
      speed: speed,
    };
  }
}

export function simpleTimeCalculator(text: string, speed: number) {
  const wordsCount = text.trim().split(/\s+/).length;
  const seconds = Math.ceil(wordsCount / speed);
  if (seconds <= 60) {
    return `0h 0m ${seconds}s`;
  } else if (seconds % 60 === 0) {
    const minutes = seconds / 60;

    return `0h ${minutes}m 0s`;
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `0h ${mins}m ${secs}s`;
  }
}

export function defineTimeText(secons: number | null, minutes: number | null) {
  if (minutes && secons) {
    if (minutes === 1) return `${minutes} minute and ${secons} seconds`;
    return `${minutes} minutes and ${secons} seconds`;
  }
  if (minutes && !secons) {
    if (minutes === 1) return `${minutes} minute`;
    return `${minutes} minutes`;
  }
  return `${secons} seconds`;
}

const ignoredWords = [
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "nor",
  "at",
  "by",
  "for",
  "in",
  "into",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "over",
  "to",
  "up",
  "with",
  "I",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "myself",
  "yourself",
  "himself",
  "herself",
  "itself",
  "ourselves",
  "themselves",
  "this",
  "that",
  "these",
  "those",
  "act",
  "are",
  "ate",
  "ban",
  "beg",
  "bid",
  "bug",
  "cut",
  "dig",
  "don",
  "dub",
  "eat",
  "fan",
  "fed",
  "fit",
  "get",
  "got",
  "had",
  "hem",
  "hit",
  "hop",
  "hum",
  "jog",
  "let",
  "lit",
  "log",
  "map",
  "met",
  "mow",
  "nod",
  "owe",
  "rap",
  "run",
  "sat",
  "set",
  "sit",
  "sum",
  "tag",
  "tap",
  "tip",
  "tow",
  "tug",
  "use",
  "wed",
  "are",
  "we",
  "do",
  "us",
  "be",
  "can",
  "as",
  "is",
  "your",
  "you",
  "you're",
];

export interface CounterValues {
  words: number;
  characters: number;
  allCharacters?: number;
  sentences: number;
  paragraphs: number;
  letters?: number;
}

export function counterHelper(text: string): CounterValues {
  const words = text.trim().split(/\s+/);
  const allCharacters = text.length;
  const characters = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.|!|?]+/).length;
  const paragraphs = text.split("\n").length;
  const leters = text.replace(/[^a-zA-Z]/g, "").length;

  return {
    words: text.trim().length > 0 ? words.length : 0,
    characters,
    allCharacters,
    sentences: text.trim().length > 0 ? sentences : 0,
    paragraphs: text.trim().length > 0 ? paragraphs : 0,
    letters: text.trim().length > 0 ? leters : 0,
  };
}

export function wordsFrecuency(text: string): Record<string, number> {
  const words = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);
  const frecuency: Record<string, number> = {};

  for (const word of words) {
    if (!ignoredWords.includes(word)) {
      if (frecuency[word]) {
        frecuency[word] += 1;
      } else {
        frecuency[word] = 1;
      }
    }
  }

  return frecuency;
}

export function calculateLevel(
  letters: number,
  words: number,
  sentences: number,
) {
  if (words === 0 || sentences === 0) {
    return 0;
  }
  const level = Math.ceil(
    4.71 * (letters / words) + (0.5 * words) / sentences - 21.43,
  );
  return level < 0 ? 0 : level;
}

const preWords = ["is", "are", "was", "were", "be", "been", "being"];

export function getAdverbs(text: string) {
  const paragraphs = text.split("\n");

  let adverbs = 0;
  let passiveVoice = 0;
  let hardSentences = 0;
  let veryHardSentences = 0;
  let simplifyWords = 0;
  let passivePreWordIndex: number;
  const newParagraphs = paragraphs.map((paragraph) => {
    const sentences = paragraph.split(".").map((sentence) => {
      const simplify = Object.keys(getComplexWords).find((word) => {
        if (sentence.includes(word)) return word;
      });
      const words = sentence.split(/\s+/);
      const letters = sentence.replace(/[\s.]/g, "").length;
      const level = calculateLevel(letters, words.length, 1);
      if (words.length < 14) {
        let changedPassive;
        const newWords = words.map((word, idx) => {
          const preIndex: number = idx - 1;
          if (
            word.endsWith("ed") &&
            preIndex >= 0 &&
            preWords.includes(words[preIndex]!)
          ) {
            passivePreWordIndex = preIndex;
            passiveVoice++;
            changedPassive = `${words[passivePreWordIndex]}-*-${word}::passive`;
            return changedPassive;
          }
          if (word.endsWith("ly")) {
            adverbs++;
            return `${word}::adverb`;
          }
          return word;
        });
        if (changedPassive) {
          newWords.splice(passivePreWordIndex, 1);
          return newWords.join(" ");
        }
        if (simplify) {
          simplifyWords++;
          const joined = simplify.replace(" ", "-*-");
          const newSentence = sentence.replace(
            simplify,
            `::simplify-*-${joined}`,
          );
          console.log("joined", newSentence);
          return newSentence;
        }
        return newWords.join(" ");
      }
      if (level >= 10 && level < 14) {
        hardSentences++;
        return `::hard-*-${sentence}`;
      }
      if (level >= 14) {
        veryHardSentences++;
        return `::veryHard-*-${sentence}`;
      }
    });
    return sentences.join(". ");
  });
  return {
    adverbsText: newParagraphs.join("\n"),
    adverbs,
    passiveVoice,
    hardSentences,
    veryHardSentences,
    simplifyWords,
  };
}

export function getPassiveVoice(text: string) {
  const paragraphs = text.split("\n");

  const newParagraphs = paragraphs.map((paragraph) => {
    const newWords = paragraph.split(/\s+/).map((word) => {
      if (word.endsWith("ly")) {
        return `${word}::adverb`;
      }
      return word;
    });
    return newWords.join(" ");
  });
  return { adverbsText: newParagraphs.join("\n") };
}

function checkWords(words: string[]) {
  const preWords = ["is", "are", "was", "were", "be", "been", "being"];
  const newWords = words.map((word, index) => {
    if (word.endsWith("ly")) {
      return `${word}::adverb`;
    } else if (preWords.includes(word)) {
      return `${word}::preword`;
    }
    return word;
  });
  return newWords;
}

export function getPassive(text: string) {
  const paragraphs = text.split("\n");

  const newParagraphs = paragraphs.map((paragraph) => {
    const newWords = checkWords(paragraph.split(/\s+/));
    return newWords.join(" ");
  });
  return { adverbsText: newParagraphs.join("\n") };
}
