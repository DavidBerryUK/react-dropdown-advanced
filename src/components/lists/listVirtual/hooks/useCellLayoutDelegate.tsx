import OptionApiModel from "../../../../models/OptionApiModel";
import EnumCellState from "../enums/EnumCellState";
import CellCollection from "../models/CellCollection";
import VirtualListConfigurationModel from "../models/VirtualListConfigurationModel";

const useCellLayoutDelegate = (configuration: VirtualListConfigurationModel) => {
  const layout = (container: React.RefObject<HTMLDivElement>, options: Array<OptionApiModel>, cellCollection: CellCollection) => {
    basicLayout(options, cellCollection);
    removeCellsOutsideVisibleContainer(container, cellCollection, configuration);
  };

  /**
   * Remove any cells nolonger displayed and requeue them
   * @param cellCollection
   */
  const removeCellsOutsideVisibleContainer = (container: React.RefObject<HTMLDivElement>, cellCollection: CellCollection, configuration: VirtualListConfigurationModel) => {
    const cellHeight = configuration.lineHeight;
    const containerHeight = container.current!.clientHeight;
    const containerOffsetY = container.current!.scrollTop;

    console.log(`removeCellsOutsideVisibleContainer: height:${containerHeight}  offset:${containerOffsetY}`);

    var displayWindowTop = container.current!.scrollTop;
    var displayWindowBottom = displayWindowTop + configuration.containerSize.height;

    cellCollection.cells.forEach((cell) => {
      if (cell.state === EnumCellState.inUse) {
        if (cell.y + cellHeight < displayWindowTop || cell.y > displayWindowBottom) {
          // cell is outside the visible range
          console.log(`Removing cell from screen :${cell.id}:${cell.title}`);
          cell.reset();
        }
      }
    });
  };

  /**
   * Development Only - just add cells to display
   * @param options
   * @param cellCollection
   * @returns
   */
  const basicLayout = (options: Array<OptionApiModel>, cellCollection: CellCollection) => {
    var count = Math.min(options.length, cellCollection.count);

    for (var i = 0; i < count; i++) {
      var cell = cellCollection.getAvailableCell();
      if (cell === undefined) {
        console.log("No cells available");
        return;
      }
      cell.title = options[i].text;
      cell.y = i * configuration.lineHeight;
    }
  };

  return { layout };
};

export default useCellLayoutDelegate;
