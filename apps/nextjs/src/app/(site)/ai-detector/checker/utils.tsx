interface Words {
  starts: number[];
  lengths: number[];
}

interface Matches {
  text: { words: Words };
}

export interface Results {
  classification: number;
  matches: Matches[];
}

interface TransformerProps {
  originalText: string;
  results: Results[];
}

export function transformResults({ originalText, results }: TransformerProps) {
  const paragraphs = originalText.split("\n");

  const highlidhtedParagraphs = paragraphs.map((paragraph) => {
    const words = paragraph.split(" ");
    const highlightedWords = results.map((result) => {
      const transformedResult = result.matches.map((match, idx) => {
        if (result.classification === 1) {
          return (
            <span key={idx} className="bg-white">
              {words
                .slice(
                  match.text.words.starts[0],
                  match.text.words.starts[0]! + match.text.words.lengths[0]!,
                )
                .join(" ")}
            </span>
          );
        } else {
          return (
            <span key={idx} className="bg-red-300">
              {words
                .slice(
                  match.text.words.starts[0],
                  match.text.words.starts[0]! + match.text.words.lengths[0]!,
                )
                .join(" ")}
            </span>
          );
        }
      });
      return transformedResult;
    });
    return highlightedWords.flat();
  });

  const transformedParagraphs = highlidhtedParagraphs.map((paragraph, idx) => {
    return (
      <div className="mb-2" key={`paragraph-${idx}`}>
        {paragraph.map((word, idx) => (
          <span key={idx} className="mr-1">
            {word}
          </span>
        ))}
      </div>
    );
  });
  return transformedParagraphs.flat();
}

export function consumedCreditsWarning(text: string, creditsLeft: number) {
  const words = text.split(" ");
  const credits = Math.ceil(words.length / 250);
  if (credits === 1) {
    return (
      <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
        This scan will consume <strong>{credits}</strong> credit. - Credits
        left: <strong>{creditsLeft}</strong>
      </span>
    );
  } else {
    return (
      <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
        This scan will consume <strong>{credits}</strong> credits. - Credits
        left: <strong>{creditsLeft}</strong>
      </span>
    );
  }
}
