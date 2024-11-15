import React from "react";

interface IProperties {}

const DropDownToolbar: React.FC<IProperties> = () => {
  return <div className="option-list-toolbar"></div>;
};

// Add a display name for debugging purposes
DropDownToolbar.displayName = "DropDownToolbar";

export default DropDownToolbar;
