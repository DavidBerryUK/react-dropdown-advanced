import React, { useEffect, useRef } from "react";
import OptionApiModel from "../../../../models/OptionApiModel";
import ConstantsKeyboard from "../../../constants/ConstantsKeyboard";
import { DropDownItemRef } from "../DropDownItem";

const useKeyboardEventsHandlers = (
  isOpen: boolean,
  highlightIndex: React.MutableRefObject<number>,
  setHighlightIndex: (index: number) => void,
  filteredOptions: OptionApiModel[],
  optionRefs: React.MutableRefObject<(DropDownItemRef | null)[]>,
  containerRef: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<OptionApiModel | null>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
) => {
  var pageJump = useRef<number>(0);

  const calculatePageJump = () => {
    if (!containerRef.current || optionRefs.current.length === 0) return 1;
    const containerHeight = containerRef.current.clientHeight;
    const totalRowHeight = optionRefs.current.reduce((sum, ref) => sum + (ref?.offsetHeight || 0), 0);
    const itemCount = filteredOptions.length;
    const averageItemHeight = totalRowHeight / itemCount;

    const jump = Math.floor(containerHeight / (averageItemHeight || 1));
    console.log(`container height:${containerHeight}  rowHeights:${totalRowHeight}  items:${itemCount}  avergeHeight:${averageItemHeight}   jump:${jump}`);
    return jump;
  };

  useEffect(() => {
    pageJump.current = calculatePageJump();
  }, [filteredOptions, containerRef, optionRefs]);

  const adjustHighlightIndexWithDelta = (delta: number) => {
    const minIndex = 0;
    const maxIndex = filteredOptions.length - 1;
    let newIndex = highlightIndex.current + delta;
    if (newIndex < minIndex) {
      newIndex = minIndex;
    }
    if (newIndex > maxIndex) {
      newIndex = maxIndex;
    }
    setHighlightIndex(newIndex);
  };

  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

        adjustHighlightIndexWithDelta(pageJump.current);
        break;
      case ConstantsKeyboard.KEY_PAGE_UP:
        e.preventDefault();

        adjustHighlightIndexWithDelta(-pageJump.current);
        break;
      case ConstantsKeyboard.KEY_ENTER:
        e.preventDefault();
        if (isOpen && filteredOptions.length > 0) {
          const item = filteredOptions[highlightIndex.current];
          setValue(item);
          setIsOpen(false);
          setSearchTerm(item.text);
        }
        break;
      case ConstantsKeyboard.KEY_ESCAPE:
        setIsOpen(false);
        break;
    }
  };

  return { handleKeyDownEvent };
};

export default useKeyboardEventsHandlers;
