import React, { useCallback, useMemo } from "react";
import OptionApiModel from "../../../../models/OptionApiModel";
import ConstantsKeyboard from "../../../constants/ConstantsKeyboard";

const useKeyboardEventsHandlers = (
  isOpen: boolean,
  highlightIndex: number,
  filteredOptions: OptionApiModel[],
  setHighlightIndex: React.Dispatch<React.SetStateAction<number>>,
  optionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  containerRef: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<OptionApiModel | null>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
) => {
  const calculatePageJump = useMemo(() => {
    if (!containerRef.current || optionRefs.current.length === 0) return 1;
    const containerHeight = containerRef.current.clientHeight;
    const averageItemHeight = optionRefs.current.reduce((sum, ref) => sum + (ref?.offsetHeight || 0), 0) / optionRefs.current.length;
    return Math.floor(containerHeight / (averageItemHeight || 1));
  }, [containerRef, optionRefs]);

  const adjustHighlightIndexWithDelta = useCallback(
    (delta: number) => {
      const minIndex = 0;
      const maxIndex = filteredOptions.length - 1;
      setHighlightIndex((prevIndex) => {
        let newIndex = prevIndex + delta;
        if (newIndex < minIndex) newIndex = minIndex;
        if (newIndex > maxIndex) newIndex = maxIndex;
        return newIndex;
      });
    },
    [filteredOptions.length, setHighlightIndex],
  );

  const handleKeyDownEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case ConstantsKeyboard.KEY_ARROW_DOWN:
          e.preventDefault();
          adjustHighlightIndexWithDelta(1);
          break;
        case ConstantsKeyboard.KEY_ARROW_UP:
          e.preventDefault();
          adjustHighlightIndexWithDelta(-1);
          break;
        case ConstantsKeyboard.KEY_PAGE_DOWN:
          e.preventDefault();
          adjustHighlightIndexWithDelta(calculatePageJump);
          break;
        case ConstantsKeyboard.KEY_PAGE_UP:
          e.preventDefault();
          adjustHighlightIndexWithDelta(-calculatePageJump);
          break;
        case ConstantsKeyboard.KEY_ENTER:
          e.preventDefault();
          if (isOpen && filteredOptions.length > 0) {
            const item = filteredOptions[highlightIndex];
            setValue(item);
            setIsOpen(false);
            setSearchTerm(item.text);
          }
          break;
        case ConstantsKeyboard.KEY_ESCAPE:
          setIsOpen(false);
          break;
      }
    },
    [adjustHighlightIndexWithDelta, calculatePageJump, filteredOptions, highlightIndex, isOpen, setIsOpen, setValue, setSearchTerm],
  );

  return { handleKeyDownEvent };
};

export default useKeyboardEventsHandlers;
