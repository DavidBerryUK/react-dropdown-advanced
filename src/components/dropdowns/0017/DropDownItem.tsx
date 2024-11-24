import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import UISwitchTickBox from "../../ui/UISwitches/UISwitchTickBox";
import UISwitchFavorite from "../../ui/UISwitches/UISwitchFavorite";

interface IProperties {
  index: number;
  item: OptionApiModel;
  onFavoriteUpdated: (item: OptionApiModel) => void;
  onSelected: (item: OptionApiModel, index: number) => void;
  onMouseOver: (item: OptionApiModel, index: number) => void;
}

const areEqual = (prevProps: IProperties, nextProps: IProperties) => {
  const isItemEqual = prevProps.item === nextProps.item;
  const isIndexEqual = prevProps.index === nextProps.index;
  const isOnFavoriteUpdatedEqual = prevProps.onFavoriteUpdated === nextProps.onFavoriteUpdated;
  const isOnSelectedEqual = prevProps.onSelected === nextProps.onSelected;
  const isOnMouseOverEqual = prevProps.onMouseOver === nextProps.onMouseOver;

  console.log(`------------Checking Memo for  ${nextProps.item.text}   ----------------`);

  // Log differences
  if (!isItemEqual) {
    console.log("Item prop has changed:", { prev: prevProps.item, next: nextProps.item });
  }
  if (!isIndexEqual) {
    console.log("Index prop has changed:", { prev: prevProps.index, next: nextProps.index });
  }
  if (!isOnFavoriteUpdatedEqual) {
    console.log("onFavoriteUpdated prop has changed:", {
      prev: prevProps.onFavoriteUpdated,
      next: nextProps.onFavoriteUpdated,
    });
  }
  if (!isOnSelectedEqual) {
    console.log("onSelected prop has changed:", {
      prev: prevProps.onSelected,
      next: nextProps.onSelected,
    });
  }
  if (!isOnMouseOverEqual) {
    console.log("onMouseOver prop has changed:", {
      prev: prevProps.onMouseOver,
      next: nextProps.onMouseOver,
    });
  }

  // Return true only if all props are equal
  return isItemEqual && isIndexEqual && isOnFavoriteUpdatedEqual && isOnSelectedEqual && isOnMouseOverEqual;
};

// Define the custom ref type with an intersection
export type DropDownItemRef = {
  setRowHighlighted: (isHighlighted: boolean) => void;
} & Pick<HTMLDivElement, "offsetHeight">;

const DropDownItem = React.memo(
  forwardRef<DropDownItemRef, IProperties>((props, ref) => {
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
      props.onSelected(props.item, props.index);
    };

    /**
     * Mouse is over this item, set the highlight index by calling mouse over,
     * This gives the parent opportunity to deselect the previous highlighted row
     */
    const handleMouseOverEvent = () => {
      props.onMouseOver(props.item, props.index);
    };

    /**
     * Toggle a user-favorite item from the list
     */
    const handleFavoriteOnChangeEvent = (value: boolean) => {
      props.onFavoriteUpdated(props.item.cloneWithFavorite(value));
    };

    const handleOnBoxOnChangeEvent = (value: boolean) => {
      props.onFavoriteUpdated(props.item.cloneWithSelected(value));
    };

    // Combine the local ref and the custom method in the exposed ref
    useImperativeHandle(ref, () => ({
      setRowHighlighted,
      offsetHeight: localRef.current?.offsetHeight ?? 0,
    }));

    return (
      <div ref={localRef} className={className} onClick={handleOnClickEvent} onMouseOver={handleMouseOverEvent}>
        <div className="col-favorite">
          <UISwitchFavorite value={props.item.favorite} onChanged={handleFavoriteOnChangeEvent} />
        </div>
        <div className="col-text">{props.item.text}</div>
        <div className="col-tick">
          <UISwitchTickBox value={props.item.selected} onChanged={handleOnBoxOnChangeEvent} />
        </div>
      </div>
    );
  }),
  areEqual,
);

// Add a display name for debugging purposes
DropDownItem.displayName = "DropDownItem";

export default DropDownItem;
