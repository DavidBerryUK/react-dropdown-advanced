import OptionApiModel from "../../../../models/OptionApiModel";
import CellCollection from "../models/CellCollection";

const useCellLayoutDelegate = () => {
  const layout = (options: Array<OptionApiModel>, cellCollection: CellCollection) => {
    var count = Math.min(options.length, cellCollection.count);

    console.log(`************ Layout Cells ************`);

    for (var i = 0; i < count; i++) {
      var cell = cellCollection.getAvailableCell();
      if (cell === undefined) {
        console.log("No cells available");
        return;
      }
      cell.title = options[i].text;
      cell.y = i * 50 - 200;
    }
  };

  return { layout };
};

export default useCellLayoutDelegate;
