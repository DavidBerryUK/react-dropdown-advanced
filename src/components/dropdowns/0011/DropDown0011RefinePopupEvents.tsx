import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useRef, useState } from "react";
import useAutoItemFocus from "./hooks/UseAutoItemFocus";
import useAutoPopupDismiss from "./hooks/UseAutoPopupDismiss";
import useKeyboardEventsHandlers from "./hooks/UseKeyboardEventsHandlers";
import useMouseEventsHandler from "./hooks/UseMouseEventsHandler";

const version = "11";
const className = "demo-0011";
const title = "Refine Popup Events";
const description = "Open popup when start typing, allow clearing of text box,";

const DropDown0011RefinePopupEvents: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());
  const [value, setValue] = useState<OptionApiModel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = customers.filter((option) => option.text.toLowerCase().includes(searchTerm.toLowerCase()));

  useAutoPopupDismiss(containerRef, inputRef, setIsOpen);
  useAutoItemFocus(optionRefs, highlightIndex);
  const { handleKeyDownEvent } = useKeyboardEventsHandlers(isOpen, highlightIndex, filteredOptions, setHighlightIndex, optionRefs, containerRef, setIsOpen, setValue, setSearchTerm);
  const { handleInputBoxClickEvent, handleOnOptionSelectedEvent, handleMouseOverEvent } = useMouseEventsHandler(isOpen, setIsOpen, setValue, setSearchTerm, setHighlightIndex);

  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input ref={inputRef} type="text" placeholder="Select an option..." value={searchTerm} onKeyDown={handleKeyDownEvent} onClick={handleInputBoxClickEvent} onChange={handleOnTextChangeEvent} />
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

export default DropDown0011RefinePopupEvents;
