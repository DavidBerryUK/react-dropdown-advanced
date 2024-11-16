import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownList from "./DropDownList";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useAutoPopupDismiss from "./hooks/UseAutoPopupDismiss";
import useKeyboardEventsHandlers from "./hooks/UseKeyboardEventsHandlers";
import useMouseEventsHandler from "./hooks/UseMouseEventsHandler";
import { DropDownItemRef } from "./DropDownItem";

const version = "13";
const className = "demo-0013";
const title = "Favorites V2";
const description = "Allow selection of favorites, was slow as re-rendered the entire list when highlighted index change, use Imperative handles to manipulate components without re-rendering ";

const DropDown0013FavoritesV2: React.FC = () => {
  const [listItems, setListItems] = useState<Array<OptionApiModel>>([]);
  const [listItemsFiltered, setListItemsFiltered] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<OptionApiModel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const highlightIndex = useRef(0);
  const optionRefs = useRef<(DropDownItemRef | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setHeightLightIndex = useCallback((newIndex: number) => {
    if (highlightIndex.current === newIndex) {
      return;
    }
    optionRefs.current[highlightIndex.current]?.setRowHighlighted(false);
    optionRefs.current[newIndex]?.setRowHighlighted(true);
    highlightIndex.current = newIndex;
  }, []);

  useAutoPopupDismiss(containerRef, inputRef, setIsOpen);
  const { handleKeyDownEvent } = useKeyboardEventsHandlers(isOpen, highlightIndex, setHeightLightIndex, listItemsFiltered, optionRefs, containerRef, setIsOpen, setValue, setSearchTerm);
  const { handleInputBoxClickEvent, handleOnOptionSelectedEvent, handleMouseOverEvent } = useMouseEventsHandler(isOpen, setIsOpen, setValue, setSearchTerm);

  useEffect(() => {
    const customers = FactoryListData.getCustomers();
    setListItems(customers);
  }, []);

  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOpen === false) {
      setIsOpen(true);
    }

    const filterValue = e.target.value;

    setSearchTerm(filterValue);
    setListItemsFiltered(listItems.filter((option) => option.text.toLowerCase().includes(filterValue)));
    setHeightLightIndex(-1);
  };

  const handleOnFavoriteUpdatedEvent = useCallback(
    (updatedItem: OptionApiModel) => {
      console.log(`Updating item ${updatedItem.text} : ${updatedItem.favorite}`);
      // Update the listItems array with the updated item
      const updatedItems = listItems.map((item) => (item.code === updatedItem.code ? updatedItem : item));

      // Update the filtered options to include the updated item
      setListItems(updatedItems);
      setListItemsFiltered(updatedItems.filter((option) => option.text.toLowerCase().includes(searchTerm)));
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
              {listItemsFiltered.length === 0 && <div>No options found</div>}
              {listItemsFiltered.length > 0 && (
                <DropDownList
                  filteredOptions={listItemsFiltered}
                  optionRefs={optionRefs}
                  handleMouseOverEvent={handleMouseOverEvent}
                  handleOnFavoriteUpdatedEvent={handleOnFavoriteUpdatedEvent}
                  handleOnOptionSelectedEvent={handleOnOptionSelectedEvent}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0013FavoritesV2;
