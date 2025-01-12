import { ReactNode, useEffect, useRef, useState } from "react";
import VirtualListConfigurationModel from "../models/VirtualListConfigurationModel";
import Size from "../../../models/Size";
import OptionApiModel from "../../../../models/OptionApiModel";
import CellCollection from "../models/CellCollection";
import useCellLayoutDelegate from "./useCellLayoutDelegate";
import useScrollMonitor from "./useScrollMonitor";

const useVirtualListManager = (options: Array<OptionApiModel>) => {
  const containerOuterDivRef = useRef<HTMLDivElement>(null);
  const containerInnerDivRef = useRef<HTMLDivElement>(null);

  const [textContainerInfo, setTextContainerInfo] = useState("");
  const virtualListConfiguration = useRef(new VirtualListConfigurationModel());
  const [cellElements, setCellElements] = useState<Array<ReactNode>>([]);
  const cellCollection = useRef<CellCollection>(new CellCollection());
  const cellLayoutDelegate = useCellLayoutDelegate(virtualListConfiguration.current!);
  const localOptions = useRef<Array<OptionApiModel>>(new Array<OptionApiModel>());

  const onScroll = (offset: number) => {
    cellLayoutDelegate.layout(localOptions.current, containerOuterDivRef, cellCollection.current);
  };

  useScrollMonitor(containerOuterDivRef, onScroll);

  /**
   * On startup - get the container size
   */
  useEffect(() => {
    if (containerOuterDivRef.current) {
      var width = containerOuterDivRef.current.clientWidth;
      var height = containerOuterDivRef.current.clientHeight;
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
    localOptions.current = options;
    console.log("Virtual List Manager - options have changed");
    /*
     * Create initial cells to be displayed on screen
     */
    if (cellCollection.current.count === 0) {
      cellCollection.current.createCollection(totalCells);
      const cells = cellCollection.current.cellElements;
      // force a re-render
      setCellElements(cells);
    } else {
      cellCollection.current.resetAll();
    }

    // SET HEIGHT OF INNER CONTAINER
    if (containerInnerDivRef.current) {
      const height = `${virtualListConfiguration.current.lineHeight * options.length}px`;

      containerInnerDivRef.current.style.height = height;
    }
  }, [options]);

  //
  // When the cell elements change check to see if the cells
  // have been rendered.
  useEffect(() => {
    cellCollection.current!.checkIfCellsAreAvailableForUse();
    cellLayoutDelegate.layout(options, containerOuterDivRef, cellCollection.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellElements, options]);

  return {
    containerOuterDivRef,
    containerInnerDivRef,
    textContainerInfo,
    cellElements,
  };
};

export default useVirtualListManager;
