import OptionApiModel from "../../../../models/OptionApiModel";
import EnumCellState from "../enums/EnumCellState";
import CellCollection from "../models/CellCollection";
import VirtualListConfigurationModel from "../models/VirtualListConfigurationModel";

const useCellLayoutDelegate = (configuration: VirtualListConfigurationModel) => {
  /**
   * Layout cells inside container
   * @param options
   * @param container
   * @param cellCollection
   */
  const layout = (options: Array<OptionApiModel>, container: React.RefObject<HTMLDivElement>, cellCollection: CellCollection) => {
    // basicLayout(options, cellCollection);
    removeCellsOutsideVisibleContainer(container, cellCollection, configuration);
    addCellsMissingFromContainer(options, container, cellCollection, configuration);
    // cellCollection.diagnosticFull();
  };

  /**
   * Remove any cells nolonger displayed and requeue them
   * @param cellCollection
   */
  const removeCellsOutsideVisibleContainer = (container: React.RefObject<HTMLDivElement>, cellCollection: CellCollection, configuration: VirtualListConfigurationModel) => {
    const cellHeight = configuration.lineHeight;
    const displayWindowTop = container.current!.scrollTop;
    const displayWindowBottom = displayWindowTop + configuration.containerSize.height;
    cellCollection.cells.forEach((cell) => {
      if (cell.state === EnumCellState.inUse) {
        if (cell.y + cellHeight < displayWindowTop || cell.y > displayWindowBottom) {
          // cell is outside the visible range
          cell.reset();
        }
      }
    });
  };

  const addCellsMissingFromContainer = (options: Array<OptionApiModel>, container: React.RefObject<HTMLDivElement>, cellCollection: CellCollection, configuration: VirtualListConfigurationModel) => {
    if (options.length === 0) {
      return;
    }

    const cellHeight = configuration.lineHeight;
    let firstRow = Math.floor((container.current!.scrollTop - cellHeight) / configuration.lineHeight);
    let lastRow = Math.ceil((container.current!.scrollTop + configuration.containerSize.height) / configuration.lineHeight);
    if (firstRow < 0) {
      firstRow = 0;
    }

    if (lastRow > options.length - 1) {
      lastRow = options.length - 1;
    }

    if (lastRow < firstRow) {
      lastRow = firstRow;
    }

    for (var row = firstRow; row <= lastRow; row++) {
      if (cellCollection.cellsInUseByRowNumber.get(row) === undefined) {
        var cell = cellCollection.getAvailableCell(row);
        if (cell === undefined) {
          console.log("No cells available");
          return;
        }
        cell.title = options[row].text;
        cell.y = row * configuration.lineHeight;
      }
    }
  };

  /**
   * Development Only - just add cells to display
   * @param options
   * @param cellCollection
   * @returns
   */
  // const basicLayout = (options: Array<OptionApiModel>, cellCollection: CellCollection) => {
  //   var count = Math.min(options.length, cellCollection.count);

  //   for (var i = 0; i < count; i++) {
  //     var cell = cellCollection.getAvailableCell(i);
  //     if (cell === undefined) {
  //       console.log("No cells available");
  //       return;
  //     }
  //     console.log("ADDING CELL");
  //     cell.title = options[i].text;
  //     cell.y = i * configuration.lineHeight;
  //   }
  // };

  return { layout };
};

export default useCellLayoutDelegate;
