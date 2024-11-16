export default class ToolbarOptionsModel {
  showFavouritesOnly: boolean = false;

  /**
   * Basic Clone
   * @returns
   */
  clone(): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel();
    model.showFavouritesOnly = this.showFavouritesOnly;
    return model;
  }

  /**
   * Change Favourties Only
   * @param showFavouritesOnly
   * @returns
   */
  cloneWithFavouritesOnly(showFavouritesOnly: boolean): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel();
    model.showFavouritesOnly = showFavouritesOnly;
    return model;
  }
}
