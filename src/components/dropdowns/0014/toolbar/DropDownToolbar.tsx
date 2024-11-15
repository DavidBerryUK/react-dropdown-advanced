import React from "react";
import ToolbarOptionsModel from "./ToolbarOptionsModel";
import UIButtonToggleStar from "../../../ui/buttonToggleStar/UIButtonToggleStar";

interface IProperties {
  value: ToolbarOptionsModel;
  onChange: (value: ToolbarOptionsModel) => void;
}

const DropDownToolbar: React.FC<IProperties> = ({ value, onChange }) => {
  //
  // Event Handler
  //
  const handleOnShowFavouritesOnlyChangedEvent = (showFavouritesOnly: boolean) => {
    onChange(value.cloneWithFavouritesOnly(showFavouritesOnly));
  };

  return (
    <div className="option-list-toolbar" title="Show only favourite items">
      <UIButtonToggleStar showFavouritesOnly={value.showFavouritesOnly} onShowFavouritesOnlyChanged={handleOnShowFavouritesOnlyChangedEvent} />
    </div>
  );
};

// Add a display name for debugging purposes
DropDownToolbar.displayName = "DropDownToolbar";

export default DropDownToolbar;
