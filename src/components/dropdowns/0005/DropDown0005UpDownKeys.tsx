import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useState } from "react";
import ConstantsKeyboard from "../../constants/ConstantsKeyboard";

const version = "5";
const className = "demo-0005";
const title = "Up/Down Keys";
const description = "process keyboard events for up down keys when the list is open. Just basic capturing";

const DropDown0005UpDownKeys: React.FC = () => {
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
    if (e.key === ConstantsKeyboard.KEY_ARROW_DOWN) {
      e.preventDefault();
      setHighlightIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
    } else if (e.key === ConstantsKeyboard.KEY_ARROW_UP) {
      e.preventDefault();
      setHighlightIndex((prevIndex) => (prevIndex - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === ConstantsKeyboard.KEY_ENTER) {
      e.preventDefault();
      if (isOpen && filteredOptions.length > 0) {
        //handleSelect(filteredOptions[highlightIndex]);
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

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
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

export default DropDown0005UpDownKeys;
