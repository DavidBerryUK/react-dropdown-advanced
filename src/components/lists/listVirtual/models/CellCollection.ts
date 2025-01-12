import { ReactNode } from "react";
import CellModel from "./CellModel";
import EnumCellState from "../enums/EnumCellState";
import CellDictionary from "./CellDictionary";

export default class CellCollection {
  // all cells
  cells: Array<CellModel>;

  // only cells that are available for use for quick access
  cellsAvailableForUse: Array<CellModel>;

  // create a dictionary off cells by their row number, to check is a cell is in place, or if one needs to be places.
  // Any cell that is placed on screen will be added to the dictionary, the key is by rowNumber.
  cellsInUseByRowNumber: CellDictionary;

  constructor() {
    this.cells = new Array<CellModel>();
    this.cellsAvailableForUse = new Array<CellModel>();
    this.cellsInUseByRowNumber = new CellDictionary();
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
    // this.diagnostic("Create Collection");
  }

  get cellElements(): Array<ReactNode> {
    return this.cells.map((item) => item.element);
  }

  checkIfCellsAreAvailableForUse() {
    //    this.diagnostic("**** Check if cells are available for use ****");
    this.cells.forEach((cell) => {
      if (cell.isRendered) {
        if (cell.state === EnumCellState.created) {
          cell.reset();
        }
      }
    });
  }

  // return the next cell available for use, or undefined if
  // no cells are available
  getAvailableCell(rowNumber: number): CellModel | undefined {
    const cell = this.cellsAvailableForUse.pop();
    if (cell) {
      cell.rowNumber = rowNumber;
      cell.state = EnumCellState.inUse;
      this.cellsInUseByRowNumber.add(cell);
    }
    // this.diagnostic(`Get available cell for row ${rowNumber} - returned ${cell !== undefined}`);
    return cell;
  }

  makeAvailable(cell: CellModel) {
    this.cellsInUseByRowNumber.remove(cell);
    this.cellsAvailableForUse.push(cell);
  }

  resetAll() {
    this.cellsAvailableForUse = new Array<CellModel>();
    this.cells.forEach((cell) => {
      cell.reset();
    });
  }

  // diagnosticLine(source: string) {
  //   const total = this.cells.length;
  //   const created = this.cells.filter((item) => item.state === EnumCellState.created).length;
  //   const available = this.cells.filter((item) => item.state === EnumCellState.available).length;
  //   const availableQueue = this.cellsAvailableForUse.length;
  //   const inUse = this.cells.filter((item) => item.state === EnumCellState.inUse).length;
  //   const inUseDictionary = this.cellsInUseByRowNumber.count;

  //   console.log(`cell collection diagnostic ${source}`);
  //   console.log(`Cells  count:${total} created:${created} inUse:${inUse} [dictionary:${inUseDictionary}]  available:${available} [queue:${availableQueue}]`);
  // }

  // diagnosticFull() {
  //   const total = this.cells.length;
  //   const created = this.cells.filter((item) => item.state === EnumCellState.created).length;
  //   const available = this.cells.filter((item) => item.state === EnumCellState.available).length;
  //   const availableQueue = this.cellsAvailableForUse.length;
  //   const inUse = this.cells.filter((item) => item.state === EnumCellState.inUse).length;
  //   const inUseDictionary = this.cellsInUseByRowNumber.count;

  //   console.log("-------------------------------------------------------------------------------");
  //   console.log(`Cells  count:${total} created:${created} inUse:${inUse} [dictionary:${inUseDictionary}]  available:${available} [queue:${availableQueue}]`);

  //   const wordLengthId = 24;
  //   const wordLengthRow = 4;
  //   const wordLengthStatus = 10;
  //   const wordLengthTitle = 40;
  //   const wordLengthAvailQueue = 18;
  //   const wordLengthRowDict = 18;

  //   const title_id = `id`.padEnd(wordLengthId, " ");
  //   const title_row = `row`.padEnd(wordLengthRow, " ");
  //   const title_status = `status`.padEnd(wordLengthStatus, " ");
  //   const title_title = "title".padEnd(wordLengthTitle, " ");
  //   const title_availQueue = "In Avail Queue".padEnd(wordLengthAvailQueue, " ");
  //   const title_inRowDict = "In Row Dict".padEnd(wordLengthRowDict, " ");

  //   console.log(`${title_id}  ${title_row}  ${title_status}  ${title_availQueue}  ${title_inRowDict}  ${title_title}`);

  //   // Sort cells by rowNumber
  //   const sortedCollection = [...this.cells].sort((a, b) => a.rowNumber - b.rowNumber);

  //   // Optimize availability check with a Set
  //   const availableSet = new Set(this.cellsAvailableForUse.map((item) => item.id));

  //   sortedCollection.forEach((cell) => {
  //     const inAvailQueueFlag = availableSet.has(cell.id);
  //     const inRowDictFlag = this.cellsInUseByRowNumber.get(cell.rowNumber) !== undefined;

  //     const id = cell.id.padEnd(wordLengthId, " ");
  //     const row = cell.rowNumber === -1 ? "NONE" : `${cell.rowNumber}`.padStart(wordLengthRow, "0");
  //     const status = `${EnumCellState[cell.state]}`.padEnd(wordLengthStatus, " ");
  //     const title = cell.title.padEnd(wordLengthTitle, " ");

  //     const availQueue = (inAvailQueueFlag ? "YES" : "NO").padEnd(wordLengthAvailQueue, " ");
  //     const inRowDict = (inRowDictFlag ? "YES" : "NO").padEnd(wordLengthRowDict, " ");

  //     console.log(`${id}  ${row}  ${status}  ${availQueue}  ${inRowDict}  ${title}`);
  //   });

  //   console.log("-------------------------------------------------------------------------------");
  // }
}
