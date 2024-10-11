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

// export function calculateReadingTime(text: string, speed: number): string {

//   const wordsCount = text.trim().split(/\s+/).length;
//   const seconds = Math.ceil(wordsCount / speed);

//   if (wordsCount === 1) {
//     if (seconds <= 60) {
//       var html =
//         "Your script is " +
//         count +
//         " word. We estimate a recording of it would be " +
//         seconds +
//         " seconds, if you average <strong>" +
//         speed +
//         " word</strong> per second";
//     } else if (seconds % 60 === 0) {
//       var minutes = parseInt(seconds) / 60;
//       var html =
//         "Your script is " +
//         count +
//         " word. We estimate a recording of it would be " +
//         minutes +
//         " minutes, if you average <strong>" +
//         speed +
//         " word</strong> per second";
//     } else {
//       var minutes = Math.floor(parseInt(seconds) / 60);
//       var secs = seconds % 60;
//       var html =
//         "Your script is " +
//         count +
//         " word. We estimate a recording of it would be " +
//         minutes +
//         " minutes and " +
//         secs +
//         " seconds, if you average <strong>" +
//         speed +
//         " word</strong> per second";
//     }
//   } else {
//     if (seconds <= 60) {
//       var html =
//         "Your script is " +
//         count +
//         " words. We estimate a recording of it would be " +
//         seconds +
//         " seconds, if you average <strong>" +
//         speed +
//         " words</strong> per second";
//     } else if (seconds % 60 === 0) {
//       var minutes = parseInt(seconds) / 60;
//       var html =
//         "Your script is " +
//         count +
//         " words. We estimate a recording of it would be " +
//         minutes +
//         " minutes, if you average <strong>" +
//         speed +
//         " words</strong> per second";
//     } else {
//       var minutes = Math.floor(parseInt(seconds) / 60);
//       var secs = seconds % 60;
//       var html =
//         "Your script is " +
//         count +
//         " words. We estimate a recording of it would be " +
//         minutes +
//         " minutes and " +
//         secs +
//         " seconds, if you average <strong>" +
//         speed +
//         " words</strong> per second";
//     }
//   }

//   var cheer = getRandomCheer();
//   var resultHtml = `<div class="cheer-text">${cheer}</div><div class="result-text">${html}</div>`;
//   $("#results").html(resultHtml);

//   var cheer = getRandomCheer();
//   var resultHtml = `<div class="cheer-text">${cheer}</div><div class="result-text">${html}</div>`;
//   $("#results").html(resultHtml);
//   var txtMsg = $("#inputBox").val();
//   //jQuery('.selVoicesBlock').removeClass('d-none');
//   if (txtMsg) {
//     jQuery.ajax({
//       url: myTimer.ajax_url,
//       type: "POST",
//       data: {
//         action: "timer_script_record",
//         seconds: seconds,
//         ip: myTimer.clientid,
//         speed: speed,
//         txtMsg: txtMsg,
//       },
//     });
//   }
// }
