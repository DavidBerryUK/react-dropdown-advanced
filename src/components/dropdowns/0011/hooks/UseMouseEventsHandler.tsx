import OptionApiModel from "../../../../models/OptionApiModel";

const useMouseEventsHandler = (
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<OptionApiModel | null>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  setHighlightIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const handleInputBoxClickEvent = () => {
    setIsOpen(!isOpen);
  };

  /**
   * handle on item selected from the drop down list
   */
  const handleOnOptionSelectedEvent = (selectedValue: OptionApiModel, index: number) => {
    setValue(selectedValue);
    setIsOpen(false);
    setSearchTerm(selectedValue.text);
  };

  const handleMouseOverEvent = (selectedValue: OptionApiModel, index: number) => {
    setHighlightIndex(index);
  };

  return {
    handleInputBoxClickEvent,
    handleOnOptionSelectedEvent,
    handleMouseOverEvent,
  };
};

export default useMouseEventsHandler;
