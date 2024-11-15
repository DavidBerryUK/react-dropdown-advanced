import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import UIIconStarSolid from "../../icons/UIIconStarSolid";
import UIIconStar from "../../icons/UIIconStar";

interface IProperties {
  index: number;
  item: OptionApiModel;
  onFavouriteUpdated: (item: OptionApiModel) => void;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

// Define the custom ref type with an intersection
export type DropDownItemRef = {
  setRowHighlighted: (isHighlighted: boolean) => void;
} & Pick<HTMLDivElement, "offsetHeight">;

const DropDownItem = React.memo(
  forwardRef<DropDownItemRef, IProperties>(({ index, item, onSelected, onMouseOver, onFavouriteUpdated }, ref) => {
    const localRef = useRef<HTMLDivElement>(null); // Internal ref to access HTMLDivElement
    const [className, setClassName] = useState("option-item");

    const calculateRowStyle = (isHighlighted: boolean) => {
      return `option-item ${isHighlighted ? "highlighted" : ""}`;
    };

    /**
     * Set the default style on instantiation
     */
    useEffect(() => {
      setClassName(calculateRowStyle(false));
    }, []);

    /**
     * Exposed function to set the highlight status of this row
     */
    const setRowHighlighted = (isHighlighted: boolean) => {
      setClassName(calculateRowStyle(isHighlighted));

      if (isHighlighted) {
        localRef.current?.scrollIntoView({
          behavior: "auto",
          block: "nearest",
        });
      }
    };

    /**
     * Clicked this item, select the item as the new value
     */
    const handleOnClickEvent = () => {
      onSelected(item, index);
    };

    /**
     * Mouse is over this item, set the highlight index by calling mouse over,
     * This gives the parent opportunity to deselect the previous highlighted row
     */
    const handleMouseOverEvent = () => {
      onMouseOver(item, index);
    };

    /**
     * Toggle a user-favorited item from the list
     */
    const handleFavouriteClickEvent = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onFavouriteUpdated(item.cloneWithFavourite(!item.favourite));
    };

    // Combine the local ref and the custom method in the exposed ref
    useImperativeHandle(ref, () => ({
      setRowHighlighted,
      offsetHeight: localRef.current?.offsetHeight ?? 0,
    }));

    return (
      <div ref={localRef} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
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
