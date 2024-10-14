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
