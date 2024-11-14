import "./styles/Styles.scss";
import DropDown0001Standard from "../dropdowns/0001/DropDown0001Standard";
import DropDown0002Searchable from "../dropdowns/0002/DropDown0002Searchable";
import DropDown0003Popup from "../dropdowns/0003/DropDown0003Popup";
import DropDown0004SubItems from "../dropdowns/0004/DropDown0004SubItems";
import React from "react";
import DropDown0005UpDownKeys from "../dropdowns/0005/DropDown0005UpDownKeys";
import DropDown0006KeepFocus from "../dropdowns/0006/DropDown0006KeepFocus";
import DropDown0007PageUpDown from "../dropdowns/0007/DropDown0007PageUpDown";
import DropDown0008SelectItem from "../dropdowns/0008/DropDown0008SelectItem";
import DropDown0009Dismiss from "../dropdowns/0009/DropDown0009Dismiss";

const App: React.FC = () => {
  return (
    <div className="demos-grid">
      <DropDown0001Standard />
      <DropDown0002Searchable />
      <DropDown0003Popup />
      <DropDown0004SubItems />
      <DropDown0005UpDownKeys />
      <DropDown0006KeepFocus />
      <DropDown0007PageUpDown />
      <DropDown0008SelectItem />
      <DropDown0009Dismiss />
    </div>
  );
};

export default App;
