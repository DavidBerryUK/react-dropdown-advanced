import { useState } from "react";
import OptionApiModel from "../../../models/OptionApiModel";
import usePerformanceTimers from "./usePerformanceTimers";
import FactoryListData from "../../../factories/FactoryListData";

const useDataLoader = () => {
  const [options, setOptions] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());
  const { timerStart, layoutTime, renderTime } = usePerformanceTimers(options);

  const handleOnListClearEvent = () => {
    timerStart();
    setOptions(new Array<OptionApiModel>());
  };

  const handleOnLoadCustomersSmallEvent = () => {
    timerStart();
    setOptions(FactoryListData.getCustomersSmallList());
  };

  const handleOnLoadCustomersLargeEvent = () => {
    timerStart();
    setOptions(FactoryListData.getCustomersLargeList());
  };

  const handleOnLoadSuppliersSmallEvent = () => {
    timerStart();
    setOptions(FactoryListData.getSuppliersSmallList());
  };

  const handleOnLoadSuppliersLargeEvent = () => {
    timerStart();
    setOptions(FactoryListData.getSuppliersLargeList());
  };

  return {
    options,
    layoutTime,
    renderTime,
    handleOnListClearEvent,
    handleOnLoadCustomersLargeEvent,
    handleOnLoadCustomersSmallEvent,
    handleOnLoadSuppliersSmallEvent,
    handleOnLoadSuppliersLargeEvent,
  };
};

export default useDataLoader;
