import React, { useCallback, useMemo } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import UIIconStarSolid from "../../icons/UIIconStarSolid";
import UIIconStar from "../../icons/UIIconStar";

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

    const handleFavouriteClickEvent = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        onFavouriteUpdated(item.cloneWithFavourite(!item.favourite));
      },
      [item, onFavouriteUpdated],
    );

    // Memoize className to avoid re-calculation on every render
    const className = useMemo(() => `option-item ${highlighted ? "highlighted" : ""}`, [highlighted]);

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
