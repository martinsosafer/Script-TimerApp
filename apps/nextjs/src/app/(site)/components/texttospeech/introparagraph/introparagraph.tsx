import React from "react";

// Define the type for props
interface IntroParagraphProps {
  status: string | undefined;
}

const characters: Record<string, string> = {
  FREE: "300 characters",
  FREE_TRIAL: "1600 characters",
  STUDENT: "2000 characters",
  CREATOR: "5000 characters",
  BUSINESS: "10000 characters",
};

function IntroParagraph(props: IntroParagraphProps) {
  const { status } = props; // Destructure status directly from props

  return (
    <>
      {status ? (
        <p className=" font-base mb-2 text-center">
          This is where you choose and create your voice overs. On your current
          plan, <br />
          <span className="font-semibold text-primary">{status} </span> you are
          entitled to{" "}
          <span className="font-semibold text-primary">
            {" "}
            {characters[status]}
          </span>{" "}
          per script
        </p>
      ) : (
        <div className="flex flex-col">
          <p className=" font-base text-center">
            This is where you choose and create your voice overs.{" "}
          </p>
          <p className=" font-base mb-2 text-center">
            Log In to Script Timer and start creating now.{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default IntroParagraph;
