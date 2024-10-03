import React from "react";

// Define the type for props
interface IntroParagraphProps {
  status: string | undefined;
  credits: number;
}
const characters: Record<string, string> = {
  FREE: "500 characters",
  FREE_TRIAL: "1000 characters",
  STUDENT: "2000 characters",
  CREATOR: "5000 characters",
  BUSINESS: "10000 characters",
  STUDENTCLMO: "2000 characters",
  CREATORCLMO: "5000 characters",
  BUSINESSCLMO: "10000 characters",
  STUDENTCLYR: "2000 characters",
  CREATORCLYR: "5000 characters",
  BUSINESSCLYR: "10000 characters",
};

// Function to get total credits based on the subscription status
const getTotalCredits = (status: string | undefined): number => {
  if (!status) return 0;

  switch (status) {
    case "FREE":
    case "FREE_TRIAL":
      return 10000;

    case "STUDENT":
    case "STUDENTCLMO":
    case "STUDENTCLYR":
      return 40000;

    case "CREATOR":
    case "CREATORCLMO":
    case "CREATORCLYR":
      return 80000;

    case "BUSINESS":
    case "BUSINESSCLMO":
    case "BUSINESSCLYR":
      return 125000;

    default:
      return 0;
  }
};
function IntroParagraph(props: IntroParagraphProps) {
  const { status, credits } = props;
  const totalCredits = getTotalCredits(status);

  console.log("Credits in User:", credits);

  return (
    <>
      {status ? (
        <div>
          <p className="font-base mb-2 text-center">
            This is where you choose and create your voice overs. On your
            current plan, <br />
            <span className="font-semibold text-primary">{status}</span>, you
            are entitled to{" "}
            <span className="font-semibold text-primary">
              {characters[status]}
            </span>{" "}
            per script.
          </p>
          <p className="font-base mb-2 text-center">
            You have{" "}
            <span className="font-semibold text-primary">{credits}</span>{" "}
            characters left of{" "}
            <span className="font-semibold text-primary">{totalCredits}</span>{" "}
            total monthly characters.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="font-base text-center">
            This is where you choose and create your voice overs.
          </p>
          <p className="font-base mb-2 text-center">
            Log in to Script Timer and start creating now.
          </p>
        </div>
      )}
    </>
  );
}

export default IntroParagraph;
