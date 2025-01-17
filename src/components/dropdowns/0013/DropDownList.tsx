import OptionApiModel from "../../../models/OptionApiModel";
import DropDownItem, { DropDownItemRef } from "./DropDownItem";
import React from "react";

interface IProperties {
  filteredOptions: OptionApiModel[];
  optionRefs: React.MutableRefObject<(DropDownItemRef | null)[]>;
  handleOnFavoriteUpdatedEvent: (selectedValue: OptionApiModel) => void;
  handleOnOptionSelectedEvent: (selectedValue: OptionApiModel, index: number) => void;
  handleMouseOverEvent: (selectedValue: OptionApiModel, index: number) => void;
}

const DropDownList: React.FC<IProperties> = ({ optionRefs, filteredOptions, handleOnFavoriteUpdatedEvent, handleOnOptionSelectedEvent, handleMouseOverEvent }) => {
  return (
    <>
      {filteredOptions.map((option, index) => {
        return (
          <DropDownItem
            onFavoriteUpdated={handleOnFavoriteUpdatedEvent}
            key={option.code}
            index={index}
            item={option}
            ref={(el) => (optionRefs.current[index] = el)}
            onSelected={handleOnOptionSelectedEvent}
            onMouseOver={handleMouseOverEvent}
          />
        );
      })}
    </>
  );
};

export default React.memo(DropDownList); // Memoize the DropDownList component to prevent unnecessary re-renders
