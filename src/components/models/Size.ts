export default class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return `${this.width}x${this.height}`;
  }
}
