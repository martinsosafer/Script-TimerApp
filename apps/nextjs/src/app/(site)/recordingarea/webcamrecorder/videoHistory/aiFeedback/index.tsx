import React from "react";

interface AIFeedbackContentProps {
  type: string;
  content: string | string[];
}

const AIFeedbackContent: React.FC<AIFeedbackContentProps> = ({
  type,
  content,
}) => {
  if (
    !content ||
    (Array.isArray(content) && content.length === 0) ||
    content === ""
  ) {
    return null;
  }

  // Updated parseContent function to safely handle content type
  const parseContent = (content: string | string[]): string[] => {
    if (typeof content === "string") {
      return content.split(/(\w+: \d+)/g).filter((item) => item.trim() !== "");
    }
    // If content is already an array, return it as is
    return Array.isArray(content) ? content : [];
  };

  const renderContent = () => {
    switch (type) {
      case "summary":
        return (
          <>
            <h5 className="text-sm font-semibold">Summary:</h5>
            <p className="mt-1 text-sm">{content as string}</p>
          </>
        );
      case "bulletPoints":
        if (
          Array.isArray(content) &&
          content.length > 0 &&
          typeof content[0] === "string"
        ) {
          const bulletPoints = content[0]
            .split("\n")
            .filter((line) => line.trim().startsWith("-"))
            .map((line) => line.replace(/^-/, "").trim());

          if (bulletPoints.length === 0) return null;

          return (
            <>
              <h5 className="text-sm font-semibold">Key Points:</h5>
              <ul className="mt-1 list-disc pl-5 text-sm">
                {bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          );
        }
        return null;
      case "sortedWords":
        return (
          <>
            <h5 className="text-sm font-semibold">Sorted Words:</h5>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {Array.isArray(content) ? (
                content.map((word, index) => <li key={index}>{word}</li>)
              ) : (
                <li>{content}</li>
              )}
            </ul>
          </>
        );
      case "sortedFillerWords":
        const fillerWords = parseContent(content);
        return (
          <>
            <h5 className="text-sm font-semibold">Filler Words:</h5>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {fillerWords.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        );
      case "mainTheme":
        return (
          <>
            <h5 className="text-sm font-semibold">Main Theme:</h5>
            <p className="mt-1 text-sm">{content as string}</p>
          </>
        );
      case "cutDowns":
        return (
          <>
            <h5 className="text-sm font-semibold">Useful Cutdowns:</h5>
            <p className="mt-1 text-sm">{content as string}</p>
          </>
        );
      case "soundBites":
        return (
          <>
            <h5 className="text-sm font-semibold">Sound Bites:</h5>
            <p className="mt-1 text-sm">{content as string}</p>
          </>
        );
      default:
        return null;
    }
  };

  const renderedContent = renderContent();

  if (!renderedContent) {
    return null;
  }

  return <div className="mt-2">{renderedContent}</div>;
};

export default AIFeedbackContent;
