import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useEffect, useRef, useState } from "react";
import useAutoItemFocus from "./hooks/UseAutoItemFocus";
import useAutoPopupDismiss from "./hooks/UseAutoPopupDismiss";
import useKeyboardEventsHandlers from "./hooks/UseKeyboardEventsHandlers";
import useMouseEventsHandler from "./hooks/UseMouseEventsHandler";

const version = "10";
const className = "demo-0010";
const title = "Code Tidy";
const description = "Only Code tidy using hooks, it is slower than the non-hooks code. may need to revert.";

const DropDown0010CodeTidy: React.FC = () => {
  const [customers, setCustomers] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());
  const [value, setValue] = useState<OptionApiModel>(new OptionApiModel("", ""));
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

  useEffect(() => {
    setCustomers(FactoryListData.getCustomersLargeList());
  }, []);

  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

export default DropDown0010CodeTidy;
