export default class OptionApiModel {
  code: string;
  text: string;
  favorite: boolean;
  selected: boolean;

  constructor(code: string, text: string, selected?: boolean, favorite?: boolean) {
    this.code = code;
    this.text = text;
    this.selected = selected ?? false;
    this.favorite = favorite ?? false;
  }

  clone(): OptionApiModel {
    return new OptionApiModel(this.code, this.text, this.selected, this.favorite);
  }

  cloneWithFavorite(value: boolean): OptionApiModel {
    return new OptionApiModel(this.code, this.text, this.selected, value);
  }

  cloneWithSelected(value: boolean): OptionApiModel {
    return new OptionApiModel(this.code, this.text, value, this.favorite);
  }
}
