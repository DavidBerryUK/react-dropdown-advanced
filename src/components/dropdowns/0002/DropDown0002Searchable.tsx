import React, { useState } from "react";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import DemoContainer from "../../container/DemoContainer";
import "./Styles.scss";

const DropDown0002Searchable: React.FC = () => {
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
    <DemoContainer className="demo-0002" version="2" title="Basic & Searchable" description="A Very basic dropdown with a UL List that is searchable">
      <div>
        <input type="text" placeholder="Select an option..." value={searchTerm || value.text || ""} onClick={() => setIsOpen(!isOpen)} onChange={(e) => setSearchTerm(e.target.value)} />
        {isOpen && (
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.code} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer">
                  {option.text}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0002Searchable;
