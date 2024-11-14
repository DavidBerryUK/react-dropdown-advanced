import React, { useCallback } from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  index: number;
  item: OptionApiModel;
  highlighted?: boolean;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

// Use React.memo to prevent unnecessary re-renders when props don't change
const DropDownItem = React.memo(
  React.forwardRef<HTMLDivElement, IProperties>(({ index, item, highlighted, onSelected, onMouseOver }, ref) => {
    const handleOnClickEvent = useCallback(() => {
      onSelected(item, index);
    }, [item, index, onSelected]);

    const handleMouseOverEvent = useCallback(() => {
      onMouseOver(item, index);
    }, [item, index, onMouseOver]);

    const className = `option-item ${highlighted ? "highlighted" : ""}`;

    return (
      <div ref={ref} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
        {item.text}
      </div>
    );
  }),
);

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
