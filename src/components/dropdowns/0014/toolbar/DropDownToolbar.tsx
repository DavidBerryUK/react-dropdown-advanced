import React from "react";
import ToolbarOptionsModel from "./ToolbarOptionsModel";
import UISwitchFavourite from "../../../ui/UISwitches/UISwitchFavorite";

interface IProperties {
  value: ToolbarOptionsModel;
  onChange: (value: ToolbarOptionsModel) => void;
}

const DropDownToolbar: React.FC<IProperties> = ({ value, onChange }) => {
  //
  // Event Handler
  //
  const handleOnShowFavoritesOnlyChangedEvent = (showFavoritesOnly: boolean) => {
    onChange(value.cloneWithFavoritesOnly(showFavoritesOnly));
  };

  return (
    <div className="option-list-toolbar" title="Show only favorite items">
      <UISwitchFavourite value={value.showFavoritesOnly} onChanged={handleOnShowFavoritesOnlyChangedEvent} />
    </div>
  );
};

// Add a display name for debugging purposes
DropDownToolbar.displayName = "DropDownToolbar";

export default DropDownToolbar;
