import { Badge } from "@voiceai/ui/@/components/ui/badge";

const ScriptInfoBadge = ({
  speedCategory,
  wordCount,
  minutes,
  formattedSeconds,
}) => {
  return (
    <Badge className="h-12 w-[570px] items-center justify-center border-4 border-primary bg-blue-500 text-sm hover:to-blue-200">
      <span className="font-bold text-tertiary dark:text-tertiary">
        {speedCategory}
      </span>
      &nbsp;Great script!&nbsp;
      <span className="font-bold text-tertiary dark:text-tertiary">
        {wordCount}
      </span>
      &nbsp;words. That looks to be about&nbsp;
      <span className="font-bold text-tertiary dark:text-tertiary">
        {minutes}
      </span>
      &nbsp;minutes and&nbsp;
      <span className="font-bold text-tertiary dark:text-tertiary">
        {formattedSeconds}
      </span>
      &nbsp;seconds.
    </Badge>
  );
};

export default ScriptInfoBadge;
