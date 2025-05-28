export function consumedCreditsWarning(text: string) {
  const words = text.split(" ");
  const credits = Math.ceil(words.length / 250);
  if (credits === 1) {
    return (
      <span className="bg-cp-accent-lightest rounded-md px-4 py-2 text-sm">
        This scan will consume <strong>{credits * 250}</strong> words
      </span>
    );
  } else {
    return (
      <span className="bg-cp-accent-lightest rounded-md px-4 py-2 text-sm">
        This scan will consume <strong>{credits * 250}</strong> words
      </span>
    );
  }
}
