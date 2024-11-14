import React, { useState } from "react";
import FactoryListData from "../../../factories/FactoryListData";
import DemoContainer from "../../container/DemoContainer";
import "./Styles.scss";

const version = "1";
const className = "demo-0001";
const title = "Native Select";
const description = "The HTML Native Select Element";

const DropDown0001Standard: React.FC = () => {
  const [customers] = useState(FactoryListData.getCustomers());

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
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
