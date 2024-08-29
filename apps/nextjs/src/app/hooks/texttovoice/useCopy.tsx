import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";

export function useCopyScript(revisedScript: string) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(revisedScript);
  };

  return { isCopied, onCopy };
}
