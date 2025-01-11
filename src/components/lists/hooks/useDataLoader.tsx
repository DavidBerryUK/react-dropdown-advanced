import { useState } from "react";
import OptionApiModel from "../../../models/OptionApiModel";

import FactoryListData from "../../../factories/FactoryListData";

const useDataLoader = () => {
  const [options, setOptions] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());

  const handleOnListClearEvent = () => {
    setOptions(new Array<OptionApiModel>());
  };

  const handleOnLoadCustomersSmallEvent = () => {
    setOptions(FactoryListData.getCustomersSmallList());
  };

  const handleOnLoadCustomersLargeEvent = () => {
    setOptions(FactoryListData.getCustomersLargeList());
  };

  const handleOnLoadSuppliersSmallEvent = () => {
    setOptions(FactoryListData.getSuppliersSmallList());
  };

  const handleOnLoadSuppliersLargeEvent = () => {
    setOptions(FactoryListData.getSuppliersLargeList());
  };

  return {
    options,

    handleOnListClearEvent,
    handleOnLoadCustomersLargeEvent,
    handleOnLoadCustomersSmallEvent,
    handleOnLoadSuppliersSmallEvent,
    handleOnLoadSuppliersLargeEvent,
  };
};

export default useDataLoader;
