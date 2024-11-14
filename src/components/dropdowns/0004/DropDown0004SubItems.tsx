import React, { useState } from "react";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import DemoContainer from "../../container/DemoContainer";
import "./Styles.scss";
import DropDownItem from "./DropDownItem";

const DropDown0004SubItems: React.FC = () => {
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
    <DemoContainer className="demo-0004" version="4" title="Render Sub Items" description="Render sub items as components">
      <div className="ui-dropdown">
        <input type="text" placeholder="Select an option..." value={searchTerm || value.text || ""} onClick={() => setIsOpen(!isOpen)} onChange={(e) => setSearchTerm(e.target.value)} />
        {isOpen && (
          <div className="ui-region-popup">
            <div className="option-list-container">
              {filteredOptions.length > 0 ? filteredOptions.map((option) => <DropDownItem key={option.code} item={option} onSelected={handleSelect} />) : <li>No options found</li>}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0004SubItems;
