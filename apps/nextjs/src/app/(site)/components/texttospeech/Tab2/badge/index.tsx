import { Badge } from "@voiceai/ui/@/components/ui/badge";

const ScriptInfoBadge = ({ wordCount, minutes, formattedSeconds }) => {
  return (
    <Badge className="h-12 w-full lg:w-[570px] items-center justify-center border-4 border-primary bg-blue-500 text-sm hover:to-blue-200 px-2 lg:px-0">
      <span className="hidden lg:inline">&nbsp;Great script!&nbsp;</span>
      <span className="font-bold text-tertiary dark:text-tertiary">
        {wordCount}
      </span>
      &nbsp;words.&nbsp;
      <span className="hidden lg:inline">That looks to be about&nbsp;</span>
      <span className="font-bold text-tertiary dark:text-tertiary">
        {minutes}
      </span>
      &nbsp;min&nbsp;
      <span className="lg:hidden">and</span>
      <span className="hidden lg:inline">&nbsp;and&nbsp;</span>
      <span className="font-bold text-tertiary dark:text-tertiary">
        {formattedSeconds}
      </span>
      &nbsp;sec<span className="hidden lg:inline">onds</span>.
    </Badge>
  );
};

export default ScriptInfoBadge;
