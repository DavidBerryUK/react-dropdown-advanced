import OptionApiModel from "../../../models/OptionApiModel";
import DropDownItem from "./DropDownItem";
import React, { useCallback } from "react";

interface IProperties {
  filteredOptions: OptionApiModel[];
  optionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  handleOnFavouriteUpdatedEvent: (selectedValue: OptionApiModel) => void;
  handleOnOptionSelectedEvent: (selectedValue: OptionApiModel, index: number) => void;
  handleMouseOverEvent: (selectedValue: OptionApiModel, index: number) => void;
}

const DropDownList: React.FC<IProperties> = React.memo(({ optionRefs, filteredOptions, handleOnFavouriteUpdatedEvent, handleOnOptionSelectedEvent, handleMouseOverEvent }) => {
  // Memoize event handlers using useCallback
  // const handleOnFavouriteUpdatedEvent = useCallback(() => {}, []);
  // const handleOnOptionSelectedEvent = useCallback(() => {}, []);
  // const handleMouseOverEvent = useCallback(() => {}, []);

  return (
    <>
      {filteredOptions.map((option, index) => {
        return (
          <DropDownItem
            onFavouriteUpdated={handleOnFavouriteUpdatedEvent}
            key={option.code}
            index={index}
            item={option}
            ref={(el) => (optionRefs.current[index] = el)}
            highlighted={false}
            onSelected={handleOnOptionSelectedEvent}
            onMouseOver={handleMouseOverEvent}
          />
        );
      })}
    </>
  );
});

export default React.memo(DropDownList); // Memoize the DropDownList component to prevent unnecessary re-renders
