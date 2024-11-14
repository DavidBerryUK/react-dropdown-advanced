import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownList from "./DropDownList";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useAutoItemFocus from "./hooks/UseAutoItemFocus";
import useAutoPopupDismiss from "./hooks/UseAutoPopupDismiss";
import useKeyboardEventsHandlers from "./hooks/UseKeyboardEventsHandlers";
import useMouseEventsHandler from "./hooks/UseMouseEventsHandler";

const version = "13";
const className = "demo-0013";
const title = "Favourites V2";
const description = "Allow selection of favourites, was slow as re-renderd the entire list when highlighted index change, updated as to only refresh the affected cells";

const DropDown0013FavouritesV2: React.FC = () => {
  const [listItems, setListItems] = useState<Array<OptionApiModel>>([]);

  const [value, setValue] = useState<OptionApiModel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());

  useAutoPopupDismiss(containerRef, inputRef, setIsOpen);
  useAutoItemFocus(optionRefs, highlightIndex);
  const { handleKeyDownEvent } = useKeyboardEventsHandlers(isOpen, highlightIndex, filteredOptions, setHighlightIndex, optionRefs, containerRef, setIsOpen, setValue, setSearchTerm);
  const { handleInputBoxClickEvent, handleOnOptionSelectedEvent, handleMouseOverEvent } = useMouseEventsHandler(isOpen, setIsOpen, setValue, setSearchTerm, setHighlightIndex);

  useEffect(() => {
    const customers = FactoryListData.getCustomers();
    setListItems(customers);
  }, []);

  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;

    setSearchTerm(filterValue);

    setFilteredOptions(listItems.filter((option) => option.text.toLowerCase().includes(filterValue)));

    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  const handleOnFavouriteUpdatedEvent = useCallback(
    (updatedItem: OptionApiModel) => {
      console.log(`Updating item ${updatedItem.text} : ${updatedItem.favourite}`);
      // Update the listItems array with the updated item
      const updatedItems = listItems.map((item) => (item.code === updatedItem.code ? updatedItem : item));

      // Update the filtered options to include the updated item
      setListItems(updatedItems);
      setFilteredOptions(updatedItems.filter((option) => option.text.toLowerCase().includes(searchTerm)));
    },
    [listItems, searchTerm],
  );

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input ref={inputRef} type="text" placeholder="Select an option..." value={searchTerm} onKeyDown={handleKeyDownEvent} onClick={handleInputBoxClickEvent} onChange={handleOnTextChangeEvent} />
        {isOpen && (
          <div className="ui-region-popup" ref={containerRef}>
            <div className="option-list-container">
              {/* {filteredOptions.length === 0 && <div>No options found</div>} */}
              {/* {filteredOptions.length > 0 && ( */}
              <DropDownList
                filteredOptions={filteredOptions}
                optionRefs={optionRefs}
                handleMouseOverEvent={handleMouseOverEvent}
                handleOnFavouriteUpdatedEvent={handleOnFavouriteUpdatedEvent}
                handleOnOptionSelectedEvent={handleOnOptionSelectedEvent}
              />
              {/* //)} */}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0013FavouritesV2;
