import { ReactNode, useEffect, useRef, useState } from "react";
import VirtualListConfigurationModel from "../VirtualListConfigurationModel";
import Size from "../../../models/Size";
import OptionApiModel from "../../../../models/OptionApiModel";
import UIListCell from "../UIListCell";
//import OptionApiModel from "../../../../models/OptionApiModel";
//import UIListCell from "../UIListCell";

const useVirtualListManager = (options: Array<OptionApiModel>) => {
  const containerDivRef = useRef<HTMLDivElement>(null);
  const [textContainerInfo, setTextContainerInfo] = useState("");
  const virtualListConfiguration = useRef(new VirtualListConfigurationModel());

  //   const cellReferences = useRef<HTMLDivElement[]>([]);

  //   const getAvailableCell = (): React.RefObject<HTMLDivElement> => {
  //     return { current: cellAvailableReferences.current[0] };
  //   };

  //   const cellUpdateData = (data: OptionApiModel) => {};

  const [cellElements, setCellElements] = useState<Array<ReactNode>>([]);
  const cellReferences = useRef<Array<HTMLDivElement | null>>([]);

  /**
   * Startup - get container size
   */
  useEffect(() => {
    if (containerDivRef.current) {
      var width = containerDivRef.current.clientWidth;
      var height = containerDivRef.current.clientHeight;
      if (width !== virtualListConfiguration.current.containerSize.width || height !== virtualListConfiguration.current.containerSize.height) {
        virtualListConfiguration.current.containerSize = new Size(width, height);
        virtualListConfiguration.current.lineHeight = 32;

        setTextContainerInfo(`Container-size:${virtualListConfiguration.current.containerSize.toString()}`);
      }
    }
  }, []);

  useEffect(() => {
    const totalCells = virtualListConfiguration.current.linesToDisplay;
    // Initialize refs only once
    if (cellReferences.current.length !== totalCells) {
      cellReferences.current = Array(totalCells)
        .fill(null)
        .map(() => null);
    }
    // Create UIListCells and assign refs
    const cells = Array.from({ length: totalCells }, (_, i) => <UIListCell key={i} ref={(el) => (cellReferences.current[i] = el)} />);
    setCellElements(cells);

    // Set the text content of the .text element inside each UIListCell
    for (let i = 0; i < totalCells; i++) {
      const cell = cellReferences.current[i];

      if (cell) {
        const textElement = cell.querySelector(".title");
        if (textElement) {
          textElement.textContent = `item-${i}`;
        }
      }
    }
  }, [options]);

  return {
    containerDivRef,
    textContainerInfo,
    cellElements,
  };
};

export default useVirtualListManager;
