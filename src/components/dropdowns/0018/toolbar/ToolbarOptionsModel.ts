export default class ToolbarOptionsModel {
  showFavoritesOnly: boolean = false;
  showSelectedOnly: boolean = false;

  constructor(showFavoritesOnly?: boolean, showSelectedOnly?: boolean) {
    this.showFavoritesOnly = showFavoritesOnly ?? false;
    this.showSelectedOnly = showSelectedOnly ?? false;
  }

  /**
   * Change Favourties Only
   * @param showFavoritesOnly
   * @returns
   */
  cloneWithFavoritesOnly(showFavoritesOnly: boolean): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel(showFavoritesOnly, this.showSelectedOnly);
    return model;
  }

  cloneWithShowSelectedOnly(showSelectedOnly: boolean): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel(this.showFavoritesOnly, showSelectedOnly);
    return model;
  }
}
