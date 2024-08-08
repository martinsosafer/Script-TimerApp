interface Words {
  starts: number[];
  lengths: number[];
}

interface Matches {
  text: { words: Words };
}

interface Results {
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
                  match.text.words.starts[0] + match.text.words.lengths[0],
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
                  match.text.words.starts[0] + match.text.words.lengths[0],
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
