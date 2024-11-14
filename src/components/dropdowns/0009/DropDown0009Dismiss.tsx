import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useEffect, useRef, useState } from "react";
import ConstantsKeyboard from "../../constants/ConstantsKeyboard";

const version = "8";
const className = "demo-0009";
const title = "Dismiss Popup";
const description = "Dismiss popup when click outside popup";

const DropDown0009Dismiss: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());
  const [value, setValue] = useState<OptionApiModel>(new OptionApiModel("", ""));
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = customers.filter((option) => option.text.toLowerCase().includes(searchTerm.toLowerCase()));

  /**
   * Calculate visible items based on container height
   */
  const calculatePageJump = () => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const averageItemHeight = optionRefs.current.reduce((sum, ref) => sum + (ref?.offsetHeight || 0), 0) / optionRefs.current.length || 1;
    const jump = Math.floor(containerHeight / averageItemHeight);
    return jump;
  };

  /**
   * Scroll the highlighted item into view whenever the highlightIndex changes
   */
  useEffect(() => {
    optionRefs.current[highlightIndex]?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
  }, [highlightIndex]);

  /**
   * handle on item selected from the drop down list
   */
  const handleOnOptionSelectedEvent = (selectedValue: OptionApiModel, index: number) => {
    setValue(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleMouseOverEvent = (selectedValue: OptionApiModel, index: number) => {
    setHighlightIndex(index);
  };

  const adjustHighlightIndexWithDelta = (delta: number) => {
    var minIndex = 0;
    var maxIndex = filteredOptions.length - 1;
    setHighlightIndex((prevIndex) => {
      var index = prevIndex + delta;
      if (index < minIndex) {
        index = minIndex;
      }
      if (index > maxIndex) {
        index = maxIndex;
      }
      return index;
    });
  };

  /**
   * process keyboard events
   */
  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ConstantsKeyboard.KEY_ARROW_DOWN) {
      e.preventDefault();
      adjustHighlightIndexWithDelta(1);
    } else if (e.key === ConstantsKeyboard.KEY_PAGE_UP) {
      e.preventDefault();
      const pageJump = calculatePageJump();
      adjustHighlightIndexWithDelta(-pageJump);
    } else if (e.key === ConstantsKeyboard.KEY_PAGE_DOWN) {
      e.preventDefault();
      const pageJump = calculatePageJump();
      adjustHighlightIndexWithDelta(pageJump);
    } else if (e.key === ConstantsKeyboard.KEY_ARROW_UP) {
      e.preventDefault();
      adjustHighlightIndexWithDelta(-1);
    } else if (e.key === ConstantsKeyboard.KEY_ENTER) {
      e.preventDefault();
      if (isOpen && filteredOptions.length > 0) {
        const item = filteredOptions[highlightIndex];
        handleOnOptionSelectedEvent(item, highlightIndex);
      }
    } else if (e.key === ConstantsKeyboard.KEY_ESCAPE) {
      setIsOpen(false);
    }
  };

  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputBoxClickEvent = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleFocusOutside = (e: FocusEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, []);

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input
          ref={inputRef}
          type="text"
          placeholder="Select an option..."
          value={searchTerm || value.text || ""}
          onKeyDown={handleKeyDownEvent}
          onClick={handleInputBoxClickEvent}
          onChange={handleOnTextChangeEvent}
        />
        {isOpen && (
          <div className="ui-region-popup" ref={containerRef}>
            <div className="option-list-container">
              {filteredOptions.length === 0 && <div>No options found</div>}
              {filteredOptions.length > 0 &&
                filteredOptions.map((option, index) => {
                  const highlighted = index === highlightIndex;
                  return (
                    <DropDownItem
                      key={option.code}
                      index={index}
                      item={option}
                      ref={(el) => (optionRefs.current[index] = el)}
                      highlighted={highlighted}
                      onSelected={handleOnOptionSelectedEvent}
                      onMouseOver={handleMouseOverEvent}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0009Dismiss;
