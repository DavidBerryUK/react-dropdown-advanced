import OptionApiModel from "../../../models/OptionApiModel";
import DropDownItem, { DropDownItemRef } from "./DropDownItem";
import { FixedSizeList as List } from "react-window";
import React from "react";

interface IProperties {
  filteredOptions: OptionApiModel[];
  optionRefs: React.MutableRefObject<(DropDownItemRef | null)[]>;
  handleOnFavoriteUpdatedEvent: (selectedValue: OptionApiModel) => void;
  handleOnOptionSelectedEvent: (selectedValue: OptionApiModel, index: number) => void;
  handleMouseOverEvent: (selectedValue: OptionApiModel, index: number) => void;
}

const DropDownList: React.FC<IProperties> = ({ optionRefs, filteredOptions, handleOnFavoriteUpdatedEvent, handleOnOptionSelectedEvent, handleMouseOverEvent }) => {
  if (filteredOptions.length === 0) {
    return null;
  }

  return (
    <>
      {}
      <List height={280} itemCount={filteredOptions.length} itemSize={50} width={"100%"}>
        {({ index }) => (
          <DropDownItem
            onFavoriteUpdated={handleOnFavoriteUpdatedEvent}
            key={filteredOptions[index].code}
            index={index}
            item={filteredOptions[index]}
            ref={(el) => (optionRefs.current[index] = el)}
            onSelected={handleOnOptionSelectedEvent}
            onMouseOver={handleMouseOverEvent}
          />
        )}
      </List>
    </>
  );
};

export default React.memo(DropDownList); // Memoize the DropDownList component to prevent unnecessary re-renders
