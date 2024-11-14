import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useEffect, useRef, useState } from "react";

const KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_UP = "ArrowUp";
const KEY_ENTER = "Enter";
const KEY_ESCAPE = "Escape";
const KEY_PAGE_UP = "PageUp";
const KEY_PAGE_DOWN = "PageDown";

const DropDown0007PageUpDown: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());
  const [value, setValue] = useState<OptionApiModel>(new OptionApiModel("", ""));
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = customers.filter((option) => option.text.toLowerCase().includes(searchTerm.toLowerCase()));

  /**
   * Calculate visible items based on container height
   */
  const calculatePageJump = () => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const averageItemHeight = optionRefs.current.reduce((sum, ref) => sum + (ref?.offsetHeight || 0), 0) / optionRefs.current.length || 1;
    const jump = Math.floor(containerHeight / averageItemHeight);

    console.log(`calculatePageJump: height:${containerHeight}   averageHeight:${averageItemHeight}   jump:${jump}`);

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
  const handleOnOptionSelectedEvent = (selectedValue: OptionApiModel) => {
    setValue(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  /**
   * process keyboard events
   */
  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_ARROW_DOWN) {
      e.preventDefault();
      setHighlightIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
    } else if (e.key === KEY_PAGE_UP) {
      e.preventDefault();
      const pageJump = calculatePageJump();
      setHighlightIndex((prevIndex) => Math.max(prevIndex - pageJump, 0));
    } else if (e.key === KEY_PAGE_DOWN) {
      e.preventDefault();
      const pageJump = calculatePageJump();
      setHighlightIndex((prevIndex) => Math.min(prevIndex + pageJump, filteredOptions.length - 1));
    } else if (e.key === KEY_ARROW_UP) {
      e.preventDefault();
      setHighlightIndex((prevIndex) => (prevIndex - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === KEY_ENTER) {
      e.preventDefault();
      if (isOpen && filteredOptions.length > 0) {
        //handleSelect(filteredOptions[highlightIndex]);
      }
    } else if (e.key === KEY_ESCAPE) {
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

  return (
    <DemoContainer className="demo-0007" version="7" title="Page Up/Down" description="allow page up / down for selection">
      <div className="ui-dropdown">
        <input
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
                  return <DropDownItem key={option.code} item={option} ref={(el) => (optionRefs.current[index] = el)} highlighted={highlighted} onSelected={handleOnOptionSelectedEvent} />;
                })}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0007PageUpDown;
