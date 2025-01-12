import { nanoid } from "nanoid";
import { ReactNode, createRef, RefObject } from "react";
import CellCollection from "./CellCollection";
import EnumCellState from "../enums/EnumCellState";
import UIListCell from "../UIListCell";

export default class CellModel {
  collectionManager: CellCollection;
  id: string;
  state: EnumCellState;
  element: ReactNode;
  reference: RefObject<HTMLDivElement>;
  rowNumber: number;

  private elementText: Element | null;
  private _y: number;
  private _title: string;

  constructor(collectionManager: CellCollection) {
    this.id = nanoid();
    this.reference = createRef<HTMLDivElement>();
    this.state = EnumCellState.created;
    this.elementText = null;
    this.collectionManager = collectionManager;
    this._y = 0;
    this.rowNumber = -1;
    this._title = "";
  }

  static create(collectionManager: CellCollection): CellModel {
    const cell = new CellModel(collectionManager);
    cell.state = EnumCellState.created;
    cell.element = <UIListCell key={cell.id} ref={cell.reference} />;
    return cell;
  }

  //
  // determine if the cell is available yet for use,
  // It may have been created but not yet rendered on the screen.
  //
  get isRendered(): boolean {
    return this.reference.current !== null;
  }

  //
  // make the cell available and clear down any data
  //
  reset() {
    this.state = EnumCellState.available;
    if (this.isRendered) {
      this.title = "";
    }
    // must call makeAvailable before changing row number
    this.collectionManager.makeAvailable(this);
    this.rowNumber = -1;
  }

  //
  // Set the cell title
  //
  set title(value: string) {
    if (this.reference.current === null) {
      return;
    }
    if (this.elementText === null) {
      this.elementText = this.reference.current.querySelector(".title");
    }
    if (this.elementText) {
      this.elementText.textContent = value;
      this._title = value;
    }
  }

  get title(): string {
    return this._title;
  }

  //
  // set Y Position
  //
  set y(value: number) {
    if (this.reference.current === null) {
      console.log("Can not set y, cell has not been rendered");
      return;
    }
    this._y = value;
    this.reference.current.style.top = `${value}px`;
  }

  get y(): number {
    return this._y;
  }
}
