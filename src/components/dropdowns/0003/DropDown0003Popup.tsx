import React, { useState } from "react";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import DemoContainer from "../../container/DemoContainer";
import "./Styles.scss";

const version = "3";
const className = "demo-0003";
const title = "Better Popup";
const description = "Make the drop down list 'popup' rather than expanding the container";

const DropDown0003Popup: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());
  const [value, setValue] = useState<OptionApiModel>(new OptionApiModel("", ""));
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = customers.filter((option) => option.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOnChange = (value: OptionApiModel) => {
    setValue(value);
  };

  const handleSelect = (selectedValue: OptionApiModel) => {
    handleOnChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input type="text" placeholder="Select an option..." value={searchTerm || value.text || ""} onClick={() => setIsOpen(!isOpen)} onChange={(e) => setSearchTerm(e.target.value)} />
        {isOpen && (
          <ul className="ui-region-popup">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.code} onClick={() => handleSelect(option)}>
                  {option.text}
                </li>
              ))
            ) : (
              <li>No options found</li>
            )}
          </ul>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0003Popup;
