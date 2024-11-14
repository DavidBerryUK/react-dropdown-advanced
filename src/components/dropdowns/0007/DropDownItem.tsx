import React from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  item: OptionApiModel;
  highlighted?: boolean;
  onSelected: (item: OptionApiModel) => void;
}

// Use React.forwardRef to forward the ref to the div element
const DropDownItem = React.forwardRef<HTMLDivElement, IProperties>(({ item, highlighted, onSelected }, ref) => {
  const handleSelect = () => {
    onSelected(item);
  };

  const className = `option-item ${highlighted ? "highlighted" : ""}`;

  return (
    <div ref={ref} className={className} onClick={handleSelect}>
      {item.text}
    </div>
  );
});

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
