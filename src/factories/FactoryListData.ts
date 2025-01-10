import OptionApiModel from "../models/OptionApiModel";

import customersLarge from "../resources/customer-large.json";
import customersSmall from "../resources/customers.json";
import suppliersLarge from "../resources/suppliers-large.json";
import suppliersSmall from "../resources/suppliers.json";

export default class FactoryListData {
  static prefixTextWithRowNumber(options: Array<OptionApiModel>): Array<OptionApiModel> {
    var newOptions = Array<OptionApiModel>();
    options.forEach((item, index) => {
      const prefix = `${index + 1}`.padStart(4, "0");
      newOptions.push(new OptionApiModel(`${item.code}`, `${prefix}:${item.text}`));
    });
    return newOptions;
  }

  static getSuppliersSmallList(): Array<OptionApiModel> {
    var options = new Array<OptionApiModel>();
    suppliersSmall.forEach((item) => {
      options.push(new OptionApiModel(`${item.id}`, item.name));
    });
    options = this.prefixTextWithRowNumber(options);
    return options;
  }

  static getSuppliersLargeList(): Array<OptionApiModel> {
    var options = new Array<OptionApiModel>();
    suppliersLarge.forEach((item) => {
      options.push(new OptionApiModel(`${item.id}`, item.name));
    });
    options = this.prefixTextWithRowNumber(options);
    return options;
  }

  static getCustomersSmallList(): Array<OptionApiModel> {
    var options = new Array<OptionApiModel>();
    customersSmall.forEach((item) => {
      options.push(new OptionApiModel(`${item.id}`, item.name));
    });
    options = this.prefixTextWithRowNumber(options);
    return options;
  }

  static getCustomersLargeList(): Array<OptionApiModel> {
    var options = new Array<OptionApiModel>();
    customersLarge.forEach((item) => {
      options.push(new OptionApiModel(`${item.id}`, item.name));
    });
    options = this.prefixTextWithRowNumber(options);
    return options;
  }
}
