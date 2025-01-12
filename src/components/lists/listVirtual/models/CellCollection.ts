import { ReactNode } from "react";
import CellModel from "./CellModel";
import EnumCellState from "../enums/EnumCellState";

export default class CellCollection {
  // all cells
  cells: Array<CellModel>;

  // only cells that are available for use
  cellsAvailableForUse: Array<CellModel>;

  constructor() {
    this.cells = new Array<CellModel>();
    this.cellsAvailableForUse = new Array<CellModel>();
  }

  get count(): number {
    return this.cells.length;
  }

  // Create a new cell and add it to the collection
  create(): CellModel {
    const cell = CellModel.create(this);
    this.cells.push(cell);
    return cell;
  }

  createCollection(count: number) {
    for (var i = 0; i < count; i++) {
      this.create();
    }
  }

  get cellElements(): Array<ReactNode> {
    return this.cells.map((item) => item.element);
  }

  checkIfCellsAreAvailableForUse() {
    this.cells.forEach((cell, index) => {
      if (cell.isRendered) {
        if (cell.state === EnumCellState.created) {
          cell.state = EnumCellState.available;
          cell.title = "";
          this.cellsAvailableForUse.push(cell);
        }
      }
    });
  }

  // return the next cell available for use, or undefined if
  // no cells are available
  getAvailableCell(): CellModel | undefined {
    const cell = this.cellsAvailableForUse.pop();
    if (cell) {
      cell.state = EnumCellState.inUse;
    }
    return cell;
  }

  makeAvailable(cell: CellModel) {
    this.cellsAvailableForUse.push(cell);
  }

  resetAll() {
    this.cells.forEach((cell) => {
      cell.reset();
    });
  }
}
