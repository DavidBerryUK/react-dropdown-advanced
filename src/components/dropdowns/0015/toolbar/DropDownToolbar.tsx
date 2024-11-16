import React from "react";
import ToolbarOptionsModel from "./ToolbarOptionsModel";
import UISwitchFavourite from "../../../ui/UISwitches/UISwitchFavorite";
import UIToolbarButton from "../../../ui/UIButtons/UIToolbarButton";
import EnumToolbarButtonType from "../../../ui/UIButtons/EnumToolbarButtonType";

interface IProperties {
  value: ToolbarOptionsModel;
  onChange: (value: ToolbarOptionsModel) => void;
  onSelectAll?: () => void;
  onSelectNone?: () => void;
}

const DropDownToolbar: React.FC<IProperties> = ({ value, onChange, onSelectAll, onSelectNone }) => {
  //
  // Event Handler
  //
  const handleOnShowFavoritesOnlyChangedEvent = (showFavoritesOnly: boolean) => {
    onChange(value.cloneWithFavoritesOnly(showFavoritesOnly));
  };

  const handleOnSelectAllButtonClickedEvent = () => {
    if (onSelectAll) {
      onSelectAll();
    }
  };

  const handleOnSelectNoneButtonClickedEvent = () => {
    if (onSelectNone) {
      onSelectNone();
    }
  };

  const handleOnShowSelectedOnlyButtonClickedEvent = () => {
    onChange(value.cloneWithShowSelectedOnly(true));
  };

  const handleOnShowAllButtonClickedEvent = () => {
    onChange(value.cloneWithShowSelectedOnly(false));
  };

  return (
    <div className="option-list-toolbar" title="Show only favorite items">
      <UISwitchFavourite value={value.showFavoritesOnly} onChanged={handleOnShowFavoritesOnlyChangedEvent} />
      <UIToolbarButton type={EnumToolbarButtonType.SelectAll} onClicked={handleOnSelectAllButtonClickedEvent} />
      <UIToolbarButton type={EnumToolbarButtonType.SelectNone} onClicked={handleOnSelectNoneButtonClickedEvent} />
      <UIToolbarButton type={EnumToolbarButtonType.ShowOnlySelected} onClicked={handleOnShowSelectedOnlyButtonClickedEvent} />
      <UIToolbarButton type={EnumToolbarButtonType.ShowAll} onClicked={handleOnShowAllButtonClickedEvent} />
    </div>
  );
};

// Add a display name for debugging purposes
DropDownToolbar.displayName = "DropDownToolbar";

export default DropDownToolbar;
