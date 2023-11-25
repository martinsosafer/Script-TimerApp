import { useEffect, useState } from "react";

export function useIsTruncated(ref) {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const isTextTruncated = element.scrollWidth > element.clientWidth;
      setIsTruncated(isTextTruncated);
    }
  }, [ref]);

  return isTruncated;
}
