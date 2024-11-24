import React from "react";
import OptionApiModel from "../../../models/OptionApiModel";

interface IProperties {
  listItemsFiltered: Array<OptionApiModel>;
}

const DropDownNoOptionsFound: React.FC<IProperties> = ({ listItemsFiltered }) => {
  if (listItemsFiltered.length > 0) {
    return null;
  }
  return <div>No options found</div>;
};

// Add a display name for debugging purposes
DropDownNoOptionsFound.displayName = "DropDownToolbar";

export default DropDownNoOptionsFound;
