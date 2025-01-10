import "../../styles/Styles.scss";
import React from "react";
import UIListBasic from "../lists/listBasic/UIListBasic";
import UIListVirtual from "../lists/listVirtual/UIListVirtual";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <UIListBasic />
      <UIListVirtual />
    </div>
  );
};

export default App;
