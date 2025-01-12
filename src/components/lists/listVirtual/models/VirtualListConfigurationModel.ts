import Size from "../../../models/Size";

export default class VirtualListConfigurationModel {
  private _containerSize: Size = new Size(0, 0);
  private _lineHeight: number = 32;
  private _linesToDisplay: number = 0;

  set containerSize(size: Size) {
    this._containerSize = size;
    this.calculateLayoutSettings();
  }

  get containerSize(): Size {
    return this._containerSize;
  }

  set lineHeight(height: number) {
    this._lineHeight = height;
    this.calculateLayoutSettings();
  }

  get lineHeight(): number {
    return this._lineHeight;
  }

  get linesToDisplay(): number {
    return this._linesToDisplay;
  }

  private calculateLayoutSettings() {
    // calculate the number of lines that will fit in the on screen container (will need cater for partial item views)
    this._linesToDisplay = Math.floor(this._containerSize.height / this._lineHeight) + 8;
  }
}
