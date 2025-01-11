import CellModel from "./CellModel";

export default class CellCollection {
  cells: Array<CellModel>;

  constructor() {
    this.cells = new Array<CellModel>();
  }

  // Create a new cell and add it to the collection
  create(): CellModel {
    const cell = CellModel.create();
    this.cells.push(cell);
    return cell;
  }
}
