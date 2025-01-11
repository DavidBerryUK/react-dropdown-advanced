import "../../styles/Styles.scss";
import React from "react";
import UIListVirtual from "../lists/listVirtual/UIListVirtual";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <UIListVirtual />
    </div>
  );
};

export default App;
