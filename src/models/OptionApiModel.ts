export default class OptionApiModel {
  code: string;
  text: string;
  favourite: boolean;

  constructor(code: string, text: string, favourite?: boolean) {
    this.code = code;
    this.text = text;
    this.favourite = favourite ?? false;
  }

  clone(): OptionApiModel {
    return new OptionApiModel(this.code, this.text, this.favourite);
  }

  cloneWithFavourite(favourite: boolean): OptionApiModel {
    return new OptionApiModel(this.code, this.text, favourite);
  }
}
