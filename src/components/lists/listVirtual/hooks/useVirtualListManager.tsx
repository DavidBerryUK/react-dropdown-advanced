import { ReactNode, useEffect, useRef, useState } from "react";
import VirtualListConfigurationModel from "../models/VirtualListConfigurationModel";
import Size from "../../../models/Size";
import OptionApiModel from "../../../../models/OptionApiModel";
import CellCollection from "../models/CellCollection";
import useCellLayoutDelegate from "./useCellLayoutDelegate";

const useVirtualListManager = (options: Array<OptionApiModel>) => {
  const containerDivRef = useRef<HTMLDivElement>(null);
  const [textContainerInfo, setTextContainerInfo] = useState("");
  const virtualListConfiguration = useRef(new VirtualListConfigurationModel());
  const [cellElements, setCellElements] = useState<Array<ReactNode>>([]);
  const cellCollection = useRef<CellCollection>(new CellCollection());
  const cellLayoutDelegate = useCellLayoutDelegate();

  /**
   * On startup - get the container size
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

  //
  // Whenever the list of options changes, create
  // a number of cell.
  useEffect(() => {
    const totalCells = virtualListConfiguration.current.linesToDisplay;
    console.log("Virtual List Manager - options have changed");
    /*
     * Create initial cells to be displayed on screen
     */
    if (cellCollection.current.count === 0) {
      console.log("Create initial cells");
      cellCollection.current.createCollection(totalCells);
      const cells = cellCollection.current.cellElements;
      // force a re-render
      setCellElements(cells);
    } else {
      console.log("Resetting all cells");
      cellCollection.current.resetAll();
    }
  }, [options]);

  //
  // When the cell elements change check to see if the cells
  // have been rendered.
  useEffect(() => {
    cellCollection.current!.checkIfCellsAreAvailableForUse();
    cellLayoutDelegate.layout(options, cellCollection.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellElements, options]);

  return {
    containerDivRef,
    textContainerInfo,
    cellElements,
  };
};

export default useVirtualListManager;
