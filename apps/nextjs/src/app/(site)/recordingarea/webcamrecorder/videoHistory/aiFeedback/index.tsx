import React from "react";

interface AIFeedbackContentProps {
  type: string;
  content: string | string[];
}

const AIFeedbackContent: React.FC<AIFeedbackContentProps> = ({
  type,
  content,
}) => {
  if (!content) return null;

  switch (type) {
    case "summary":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Summary:</h5>{" "}
          <p className="mt-1 text-sm">{content as string}</p>{" "}
        </div>
      );
    case "bulletPoints":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Key Points:</h5>{" "}
          <ul className="mt-1 list-disc pl-5 text-sm">
            {" "}
            {Array.isArray(content) &&
            content.length > 0 &&
            typeof content[0] === "string"
              ? content[0]
                  .split("\n")
                  .filter((line) => line.trim().startsWith("-"))
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^-/, "").trim()}</li>
                  ))
              : null}{" "}
          </ul>{" "}
        </div>
      );
    case "sortedWords":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Sorted Words:</h5>{" "}
          <p className="mt-1 text-sm">{content as string}</p>{" "}
        </div>
      );
    case "mainTheme":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Main Theme:</h5>{" "}
          <p className="mt-1 text-sm">{content as string}</p>{" "}
        </div>
      );
    case "cutDowns":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Useful Cutdowns:</h5>{" "}
          <p className="mt-1 text-sm">{content as string}</p>{" "}
        </div>
      );
    case "soundBites":
      return (
        <div className="mt-2">
          {" "}
          <h5 className="text-sm font-semibold">Sound Bites:</h5>{" "}
          <p className="mt-1 text-sm">{content as string}</p>{" "}
        </div>
      );
    default:
      return null;
  }
};

export default AIFeedbackContent;
