export function consumedCreditsWarning(text: string) {
  const words = text.split(" ");
  const credits = Math.ceil(words.length / 250);
  if (credits === 1) {
    return (
      <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
        This scan will consume <strong>{credits * 250}</strong> credit.
      </span>
    );
  } else {
    return (
      <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
        This scan will consume <strong>{credits * 250}</strong> credits.
      </span>
    );
  }
}
