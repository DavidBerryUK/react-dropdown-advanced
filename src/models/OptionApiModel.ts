export default class OptionApiModel {
  code: string;
  text: string;
  favorite: boolean;

  constructor(code: string, text: string, favorite?: boolean) {
    this.code = code;
    this.text = text;
    this.favorite = favorite ?? false;
  }

  clone(): OptionApiModel {
    return new OptionApiModel(this.code, this.text, this.favorite);
  }

  cloneWithFavorite(favorite: boolean): OptionApiModel {
    return new OptionApiModel(this.code, this.text, favorite);
  }
}
