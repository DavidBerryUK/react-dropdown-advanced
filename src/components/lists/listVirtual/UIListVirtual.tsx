import "./Styles.scss";
import UIListToolbar from "../components/UIListToolbar";
import useDataLoader from "../hooks/useDataLoader";
import React, { useEffect, useState } from "react";

import UIStandardList from "./disposable-code/UIStandardList";
import useVirtualListManager from "./hooks/useVirtualListManager";

const UIListVirtual: React.FC = () => {
  const [textListCount, setTextListCount] = useState("");

  const { options, handleOnListClearEvent, handleOnLoadCustomersLargeEvent, handleOnLoadCustomersSmallEvent, handleOnLoadSuppliersSmallEvent, handleOnLoadSuppliersLargeEvent } = useDataLoader();

  const { cellElements, containerDivRef, textContainerInfo } = useVirtualListManager(options);

  useEffect(() => {
    setTextListCount(`lines:${options.length}`);
  }, [options]);

  return (
    <div className="demo-virtual-list-container">
      <h2>Virtual List</h2>
      <UIListToolbar
        listSize={options.length}
        onClear={handleOnListClearEvent}
        onLoadCustomerLarge={handleOnLoadCustomersLargeEvent}
        onLoadCustomersSmall={handleOnLoadCustomersSmallEvent}
        onLoadSuppliersLarge={handleOnLoadSuppliersLargeEvent}
        onLoadSuppliersSmall={handleOnLoadSuppliersSmallEvent}
      />

      <div className="list-gallery">
        <div>List Count:{textListCount}</div>
        <div>ContainerSize:{textContainerInfo}</div>
        <div className="standard-list-demo">
          <UIStandardList options={options} />
        </div>

        <div ref={containerDivRef} className="virtual-list-demo">
          {cellElements.map((item) => item)}
        </div>
      </div>
    </div>
  );
};

export default UIListVirtual;
