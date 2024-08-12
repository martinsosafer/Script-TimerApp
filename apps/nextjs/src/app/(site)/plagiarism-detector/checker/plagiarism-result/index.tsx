import Link from "next/link";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";

interface PlagiarismResultProps {
  text: string;
  result: PlagiarismPayload;
}

export default function PlagiarismResult({
  text,
  result,
}: PlagiarismResultProps) {
  const {
    aggregated_score,
    identical_words,
    internet,
    total_words,
    minor_changed_words,
    related_meaning_words,
    content,
  } = result;
  return (
    <div className="flex h-full min-h-[500px] flex-col gap-2">
      <p>{content}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <div className="rounded-sm bg-gray-200 p-2">
          {" "}
          Total words: <strong>{total_words}</strong>
        </div>
        <div className="rounded-sm bg-gray-200 p-2">
          {" "}
          Score: <strong>{aggregated_score}%</strong>
        </div>
        <div className="rounded-sm bg-gray-200 p-2">
          Identical words: <strong>{identical_words}</strong>
        </div>
        <div className="rounded-sm bg-gray-200 p-2">
          {" "}
          Minor changed words: <strong>{minor_changed_words}</strong>
        </div>
        <div className="rounded-sm bg-gray-200 p-2">
          {" "}
          Related meaning words: <strong>{related_meaning_words}</strong>
        </div>
      </div>
      <div className="mt-2">
        {internet.map((item) => (
          <div key={item.id} className="mt-3">
            <Link
              href={item.url}
              target="_blank"
              className="font cursor-pointer text-lg text-primary hover:underline"
            >
              {item.title}{" "}
            </Link>
            <p>{item.introduction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
