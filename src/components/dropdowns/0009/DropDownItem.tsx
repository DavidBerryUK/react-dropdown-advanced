import React from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  index: number;
  item: OptionApiModel;
  highlighted?: boolean;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

// Use React.forwardRef to forward the ref to the div element
const DropDownItem = React.forwardRef<HTMLDivElement, IProperties>(({ index, item, highlighted, onSelected, onMouseOver }, ref) => {
  const handleOnClickEvent = () => {
    onSelected(item, index);
  };

  const handleMouseOverEvent = () => {
    onMouseOver(item, index);
  };

  const className = `option-item ${highlighted ? "highlighted" : ""}`;

  return (
    <div ref={ref} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
      {item.text}
    </div>
  );
});

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
