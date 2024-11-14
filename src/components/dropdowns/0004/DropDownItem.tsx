import React from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  item: OptionApiModel;
  onSelected: (item: OptionApiModel) => void;
}

const DropDownItem: React.FC<IProperties> = ({ item, onSelected }) => {
  const handleSelect = () => {
    onSelected(item);
  };

  return (
    <div className="option-item" onClick={handleSelect}>
      {item.text}
    </div>
  );
};

export default DropDownItem;
