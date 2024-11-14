import React from "react";
import DropDown0001Standard from "../dropdowns/0001/DropDown0001Standard";
import DropDown0002Searchable from "../dropdowns/0002/DropDown0002Searchable";
import "./styles/Styles.scss";
import DropDown0003Popup from "../dropdowns/0003/DropDown0003Popup";

const App: React.FC = () => {
  return (
    <div className="demos-grid">
      <DropDown0001Standard />
      <DropDown0002Searchable />
      <DropDown0003Popup />
    </div>
  );
};

export default App;
