import OptionApiModel from "../../../../models/OptionApiModel";
import { useCallback } from "react";

const useMouseEventsHandler = (
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<OptionApiModel | null>>,
  setHighlightIndex: (index: number) => void,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
) => {
  const handleInputBoxClickEvent = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]); // Only recreate this function when `isOpen` changes

  /**
   * handle on item selected from the drop down list
   */
  const handleOnOptionSelectedEvent = useCallback(
    (selectedValue: OptionApiModel, index: number) => {
      setValue(selectedValue);
      setIsOpen(false);
      setSearchTerm(selectedValue.text);
    },
    [setValue, setIsOpen, setSearchTerm], // Recreate only when these values change
  );

  const handleMouseOverEvent = useCallback((selectedValue: OptionApiModel, index: number) => {
    setHighlightIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleInputBoxClickEvent,
    handleOnOptionSelectedEvent,
    handleMouseOverEvent,
  };
};

export default useMouseEventsHandler;
