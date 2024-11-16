export default class ToolbarOptionsModel {
  showFavoritesOnly: boolean = false;

  /**
   * Basic Clone
   * @returns
   */
  clone(): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel();
    model.showFavoritesOnly = this.showFavoritesOnly;
    return model;
  }

  /**
   * Change Favourties Only
   * @param showFavoritesOnly
   * @returns
   */
  cloneWithFavoritesOnly(showFavoritesOnly: boolean): ToolbarOptionsModel {
    var model = new ToolbarOptionsModel();
    model.showFavoritesOnly = showFavoritesOnly;
    return model;
  }
}
