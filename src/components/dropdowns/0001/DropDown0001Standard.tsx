import React, { useState } from "react";
import FactoryListData from "../../../factories/FactoryListData";
import DemoContainer from "../../container/DemoContainer";
import "./Styles.scss";

const DropDown0001Standard: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());

  return (
    <DemoContainer className="demo-0001" version="1" title="Native Select" description="The HTML Native Select Element">
      <select>
        {customers.map((item) => (
          <option key={item.code} value={item.code}>
            {item.text}
          </option>
        ))}
      </select>
    </DemoContainer>
  );
};

export default DropDown0001Standard;
