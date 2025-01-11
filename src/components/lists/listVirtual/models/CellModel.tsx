import { ReactNode } from "react";
import UIListCell from "../UIListCell";

export default class CellModel {
  // The React Component
  element: ReactNode;

  // Reference to the componant
  reference: HTMLDivElement | null = null;

  // Create a new cell
  static create(): CellModel {
    var cell = new CellModel();
    cell.element = <UIListCell ref={(el) => (cell.reference = el)} />;
    return cell;
  }
}
