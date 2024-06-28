import internal from "stream";
import React from "react";

// Define the type for props
interface IntroParagraphProps {
  status: string | undefined;
}

function IntroParagraph(props: IntroParagraphProps) {
  const { status } = props; // Destructure status directly from props

  // const voiceText =
  //   status === "FREE"
  //     ? "5 voices"
  //     : status === "FREE_TRIAL"
  //       ? "50 voices"
  //       : status === "STUDENT"
  //         ? "50 voices"
  //         : status === "CREATOR"
  //           ? "50 voices"
  //           : "50 voices";

  const scriptText =
    status === "FREE"
      ? "300 characters"
      : status === "FREE_TRIAL"
        ? "2000 characters"
        : status === "STUDENT"
          ? "2,000 characters"
          : status === "CREATOR"
            ? "5,000 characters"
            : status === "BUSINESS"
              ? "5,000 characters"
              : "300 characters";

  // const characterText =
  //   status === "FREE"
  //     ? "2000 characters"
  //     : status === "FREE_TRIAL"
  //       ? "150,000 characters"
  //       : status === "STUDENT"
  //         ? "150,000 characters"
  //         : "300,000 characters";

  return (
    <>
      <p className=" font-base  mb-2">
        This is where you choose and create your voice overs. On your current
        plan, <br />
        <span className="font-semibold text-primary">{status} </span> you are
        entitled to{" "}
        <span className="font-semibold text-primary"> {scriptText}</span> per
        script
      </p>
    </>
  );
}

export default IntroParagraph;
