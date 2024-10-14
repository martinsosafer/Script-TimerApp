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
  allCharacters: number;
  sentences: number;
  paragraphs: number;
}

export function counterHelper(text: string): CounterValues {
  const words = text.trim().split(/\s+/);
  const characters = text.length;
  const allCharacters = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.|!|?]+/).length;
  const paragraphs = text.split(/\n\n+/).length;

  return {
    words: text.trim().length > 0 ? words.length : 0,
    characters,
    allCharacters,
    sentences: text.trim().length > 0 ? sentences : 0,
    paragraphs: text.trim().length > 0 ? paragraphs : 0,
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
