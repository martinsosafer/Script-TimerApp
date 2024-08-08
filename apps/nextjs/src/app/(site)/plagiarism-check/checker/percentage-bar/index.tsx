function generatePercentage(result: number, classname?: boolean) {
  const percentage = Math.floor(result * 100);
  if (classname) {
    return `w-[${percentage}%]`;
  }
  return percentage;
}

export default function PercentageBar({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  return (
    <div className="flex w-full flex-col rounded-md border-2 border-gray-300 p-2">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{generatePercentage(percentage)}%</span>
      </div>
      <div className="flex h-3 min-w-full justify-start overflow-hidden rounded-full bg-gray-400">
        <div className={`${generatePercentage(percentage, true)} bg-primary`} />
      </div>
    </div>
  );
}
