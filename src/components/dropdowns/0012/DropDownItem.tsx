import React, { useCallback } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import UIIconStar from "../../icons/UIIconStar";
import UIIconStarSolid from "../../icons/UIIconStarSolid";

interface IProperties {
  index: number;
  item: OptionApiModel;
  highlighted?: boolean;
  onFavoriteUpdated: (item: OptionApiModel) => void;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

// Use React.memo to prevent unnecessary re-renders when props don't change
const DropDownItem = React.memo(
  React.forwardRef<HTMLDivElement, IProperties>(({ index, item, highlighted, onSelected, onMouseOver, onFavoriteUpdated }, ref) => {
    const handleOnClickEvent = useCallback(() => {
      onSelected(item, index);
    }, [item, index, onSelected]);

    const handleMouseOverEvent = useCallback(() => {
      onMouseOver(item, index);
    }, [item, index, onMouseOver]);

    const handleFavoriteClickEvent = (event: React.MouseEvent<HTMLElement>) => {
      // toggle favorite
      event.stopPropagation();
      onFavoriteUpdated(item.cloneWithFavorite(!item.favorite));
    };

    const className = `option-item ${highlighted ? "highlighted" : ""}`;

    return (
      <div ref={ref} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
        <div className="favorite" onClick={handleFavoriteClickEvent}>
          {item.favorite ? <UIIconStarSolid /> : <UIIconStar />}
        </div>
        <div className="text">{item.text}</div>
      </div>
    );
  }),
);

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
