import "./styles/Styles.scss";
import DropDown0001Standard from "../dropdowns/0001/DropDown0001Standard";
import DropDown0002Searchable from "../dropdowns/0002/DropDown0002Searchable";
import DropDown0003Popup from "../dropdowns/0003/DropDown0003Popup";
import DropDown0004SubItems from "../dropdowns/0004/DropDown0004SubItems";
import DropDown0005UpDownKeys from "../dropdowns/0005/DropDown0005UpDownKeys";
import DropDown0006KeepFocus from "../dropdowns/0006/DropDown0006KeepFocus";
import DropDown0007PageUpDown from "../dropdowns/0007/DropDown0007PageUpDown";
import DropDown0008SelectItem from "../dropdowns/0008/DropDown0008SelectItem";
import DropDown0009Dismiss from "../dropdowns/0009/DropDown0009Dismiss";
import DropDown0010CodeTidy from "../dropdowns/0010/DropDown0010CodeTidy";
import DropDown0011RefinePopupEvents from "../dropdowns/0011/DropDown0011RefinePopupEvents";
import DropDown0012Favorites from "../dropdowns/0012/DropDown0012Favourites";
import React from "react";
import DropDown0013FavouritesV2 from "../dropdowns/0013/DropDown0013FavouritesV2";

const App: React.FC = () => {
  return (
    <div className="demos-grid">
      {/* <DropDown0001Standard />
      <DropDown0002Searchable />
      <DropDown0003Popup />
      <DropDown0004SubItems />
      <DropDown0005UpDownKeys />
      <DropDown0006KeepFocus />
      <DropDown0007PageUpDown />
      <DropDown0008SelectItem />
      <DropDown0009Dismiss />
      <DropDown0010CodeTidy />
      <DropDown0011RefinePopupEvents />
      <DropDown0012Favorites /> */}
      <DropDown0013FavouritesV2 />
    </div>
  );
};

export default App;
