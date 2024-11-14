import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useState } from "react";

const KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_UP = "ArrowUp";
const KEY_ENTER = "Enter";
const KEY_ESCAPE = "Escape";

const DropDown0006KeepFocus: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());
  const [value, setValue] = useState<OptionApiModel>(new OptionApiModel("", ""));
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const filteredOptions = customers.filter((option) => option.text.toLowerCase().includes(searchTerm.toLowerCase()));

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
    <DemoContainer className="demo-0006" version="6" title="Keep Focus" description="keep focus on the selected item when pressing up/down">
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
          <div className="ui-region-popup">
            <div className="option-list-container">
              {filteredOptions.length === 0 && <div>No options found</div>}

              {filteredOptions.length > 0 &&
                filteredOptions.map((option, index) => {
                  const highlighted = index === highlightIndex;
                  return <DropDownItem key={option.code} item={option} highlighted={highlighted} onSelected={handleOnOptionSelectedEvent} />;
                })}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0006KeepFocus;
