import { useEffect } from "react";

const useAutoItemFocus = (optionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, highlightIndex: number) => {
  /**
   * Scroll the highlighted item into view whenever the highlightIndex changes
   */
  useEffect(() => {
    optionRefs.current[highlightIndex]?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
  }, [highlightIndex]);
};

export default useAutoItemFocus;
