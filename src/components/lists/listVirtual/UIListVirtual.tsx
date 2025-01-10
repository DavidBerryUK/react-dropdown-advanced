import "./Styles.scss";
import UIListToolbar from "../components/UIListToolbar";
import useDataLoader from "../hooks/useDataLoader";
import React, { useEffect, useRef, useState } from "react";
import VirtualListConfigurationModel from "./VirtualListConfigurationModel";
import Size from "../../models/Size";

const UIItem: React.FC = () => {
  return <div className="ui-static-elements">Static Content</div>;
};

const UIListVirtual: React.FC = () => {
  const containerDivRef = useRef<HTMLDivElement>(null);
  const [textContainer, setTextContainer] = useState("");
  const virtualListConfiguration = useRef(new VirtualListConfigurationModel());

  // Create an array of refs to store the references to each UIItem
  const staticContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (staticContentRefs.current.length === 0) {
      // Initialize staticContentRefs with 4 elements (each referencing a UIItem)
      staticContentRefs.current = Array(4).fill(null);
    }
  }, []);

  const {
    options,
    layoutTime,
    renderTime,
    handleOnListClearEvent,
    handleOnLoadCustomersLargeEvent,
    handleOnLoadCustomersSmallEvent,
    handleOnLoadSuppliersSmallEvent,
    handleOnLoadSuppliersLargeEvent,
  } = useDataLoader();

  useEffect(() => {
    if (containerDivRef.current) {
      var width = containerDivRef.current.clientWidth;
      var height = containerDivRef.current.clientHeight;
      // set virtual layout parameters
      virtualListConfiguration.current.containerSize = new Size(width, height);
      virtualListConfiguration.current.lineHeight = 32;
      setTextContainer(`Container-size ${virtualListConfiguration.current.containerSize.toString()} - lines to display ${virtualListConfiguration.current.linesToDisplay}`);
    }
  }, []);

  /*****************************************************************/
  /* Handle Scroll Container
  /*****************************************************************/
  useEffect(() => {
    const container = containerDivRef.current;

    const handleScroll = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        console.log(`Scrolled to: ${scrollTop}`);
        console.log(`Scroll progress: ${(scrollTop / (scrollHeight - clientHeight)) * 100}%`);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  /*****************************************************************/
  /* Button handler to change position of each UIItem
  /*****************************************************************/
  const moveUIItem = (index: number) => {
    if (staticContentRefs.current[index]) {
      const uiItemRef = staticContentRefs.current[index];
      // Modify the style to change the position of the UIItem at the given index
      uiItemRef!.style.position = "absolute"; // Positioning it absolutely
      uiItemRef!.style.left = `${100 + index * 50}px`; // Offset each UIItem by 50px
      uiItemRef!.style.top = `${150 + index * 50}px`; // Offset each UIItem by 50px
    }
  };

  return (
    <div className="demo-container">
      <h2>Virtual List</h2>
      <UIListToolbar
        layoutTime={layoutTime}
        renderTime={renderTime}
        listSize={options.length}
        onClear={handleOnListClearEvent}
        onLoadCustomerLarge={handleOnLoadCustomersLargeEvent}
        onLoadCustomersSmall={handleOnLoadCustomersSmallEvent}
        onLoadSuppliersLarge={handleOnLoadSuppliersLargeEvent}
        onLoadSuppliersSmall={handleOnLoadSuppliersSmallEvent}
      />
      <div className="ui-virtual-list">
        {textContainer}
        <div ref={containerDivRef} className="list-container">
          {options.map((item) => (
            <div key={item.code} className="list-item">
              {item.text}
            </div>
          ))}

          {/* Render 4 instances of UIItem */}
          {[...Array(4)].map((_, index) => (
            <div key={index} ref={(el) => (staticContentRefs.current[index] = el)} className="ui-static-elements">
              <UIItem />
              <button onClick={() => moveUIItem(index)}>Move Item {index + 1}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIListVirtual;
