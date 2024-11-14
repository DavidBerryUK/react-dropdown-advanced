import React from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  item: OptionApiModel;
  highlighted?: boolean;
  onSelected: (item: OptionApiModel) => void;
}

const DropDownItem: React.FC<IProperties> = ({ item, highlighted, onSelected }) => {
  const handleSelect = () => {
    onSelected(item);
  };

  const className = `option-item ${highlighted ? "highlighted" : ""}`;

  return (
    <div className={className} onClick={handleSelect}>
      {item.text}
    </div>
  );
};

export default DropDownItem;
