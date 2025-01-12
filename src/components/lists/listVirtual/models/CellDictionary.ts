import CellModel from "./CellModel";

export default class CellDictionary {
  itemsDictionary: Record<number, CellModel>;

  constructor() {
    this.itemsDictionary = {};
  }

  reset() {
    this.itemsDictionary = {};
  }

  get count(): number {
    return Object.values(this.itemsDictionary).length;
  }

  add(cell: CellModel) {
    this.itemsDictionary[cell.rowNumber] = cell;
  }

  get(rowNumber: number): CellModel | undefined {
    return this.itemsDictionary[rowNumber];
  }

  remove(cell: CellModel) {
    delete this.itemsDictionary[cell.rowNumber];
  }
}
