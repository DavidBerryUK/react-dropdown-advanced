import React, { useCallback } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import UIIconStar from "../../icons/UIIconStar";
import UIIconStarSolid from "../../icons/UIIconStarSolid";

interface IProperties {
  index: number;
  item: OptionApiModel;
  highlighted?: boolean;
  onFavouriteUpdated: (item: OptionApiModel) => void;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

// Use React.memo to prevent unnecessary re-renders when props don't change
const DropDownItem = React.memo(
  React.forwardRef<HTMLDivElement, IProperties>(({ index, item, highlighted, onSelected, onMouseOver, onFavouriteUpdated }, ref) => {
    const handleOnClickEvent = useCallback(() => {
      onSelected(item, index);
    }, [item, index, onSelected]);

    const handleMouseOverEvent = useCallback(() => {
      onMouseOver(item, index);
    }, [item, index, onMouseOver]);

    const handleFavouriteClickEvent = (event: React.MouseEvent<HTMLElement>) => {
      // toggle favourite
      event.stopPropagation();
      onFavouriteUpdated(item.cloneWithFavourite(!item.favourite));
    };

    const className = `option-item ${highlighted ? "highlighted" : ""}`;

    return (
      <div ref={ref} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
        <div className="favourite" onClick={handleFavouriteClickEvent}>
          {item.favourite ? <UIIconStarSolid /> : <UIIconStar />}
        </div>
        <div className="text">{item.text}</div>
      </div>
    );
  }),
);

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
