import { useLayoutEffect, useState } from "react";

export function useIsTruncated(ref) {
  const [isTruncated, setIsTruncated] = useState(false);

  // useLayoutEffect runs synchronously after all DOM mutations, ensuring that styles are applied
  useLayoutEffect(() => {
    function checkTruncation() {
      const element = ref.current;
      if (element) {
        // Use getBoundingClientRect().width instead of clientWidth for sub-pixel precision
        const isTextTruncated =
          element.scrollWidth > element.getBoundingClientRect().width;
        setIsTruncated(isTextTruncated);
      }
    }

    // Check truncation on initial render
    checkTruncation();

    // Set up a resize observer for the element or window to handle resizing
    window.addEventListener("resize", checkTruncation);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [ref]);

  return isTruncated;
}
