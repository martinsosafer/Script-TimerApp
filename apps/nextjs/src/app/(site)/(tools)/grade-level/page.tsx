import Grader from "./grader";

export default function GradeLevelge() {
  return (
    <div className="flex w-[1000px] flex-col items-center">
      <div className="my-8 flex w-full flex-col items-center">
        <h2 className="text-4xl font-bold text-primary">
          Your Script's Grade Level
        </h2>
      </div>
      <Grader />
    </div>
  );
}
