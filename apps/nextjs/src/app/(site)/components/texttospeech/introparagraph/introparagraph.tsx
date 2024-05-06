import internal from "stream";
import React from "react";

// Define the type for props
interface IntroParagraphProps {
  status: string | undefined;
}

function IntroParagraph(props: IntroParagraphProps) {
  const { status } = props; // Destructure status directly from props

  const voiceText =
    status === "FREE"
      ? "5 voices"
      : status === "FREE_TRIAL"
        ? "50 voices"
        : status === "STUDENT"
          ? "50 voices"
          : status === "CREATOR"
            ? "50 voices"
            : "50 voices";

  const scriptText =
    status === "FREE"
      ? "300 words"
      : status === "FREE_TRIAL"
        ? "2000 words"
        : status === "STUDENT"
          ? "2000 words"
          : status === "CREATOR"
            ? "5000 words"
            : "300 words";

  const characterText =
    status === "FREE"
      ? "2000 credits"
      : status === "FREE_TRIAL"
        ? "150000 credits"
        : status === "STUDENT"
          ? "150000 characters"
          : "300000 credits";

  return (
    <>
      <p className=" mb-2  font-medium">
        This is your text to speech page. You are now entitled to{" "}
        <span className=" font-semibold text-primary">
          {voiceText} <br />
        </span>
        , make <span className="font-semibold text-primary">{scriptText}</span>{" "}
        scripts and up to{" "}
        <span className="font-semibold text-primary">{characterText}</span> per
        month.
      </p>
    </>
  );
}

export default IntroParagraph;
