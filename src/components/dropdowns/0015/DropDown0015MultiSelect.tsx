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
import DropDownToolbar from "./toolbar/DropDownToolbar";
import DropDownNoOptionsFound from "./DropDownNoOptionsFound";
import ToolbarOptionsModel from "./toolbar/ToolbarOptionsModel";

const version = "15";
const className = "demo-0015";
const title = "Multi Select";
const description = "Multi Select Rows, select all, select none, show selected only. This is getting slow again and needs optimisation.";

const DropDown0015MultiSelect: React.FC = () => {
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

  const [toolbarOptionsModel, setToolbarOptionsModel] = useState<ToolbarOptionsModel>(new ToolbarOptionsModel());

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
  const { handleInputBoxClickEvent, handleOnOptionSelectedEvent, handleMouseOverEvent } = useMouseEventsHandler(isOpen, setIsOpen, setValue, setHeightLightIndex, setSearchTerm);

  useEffect(() => {
    const customers = FactoryListData.getCustomersLargeList();
    setListItems(customers);
  }, []);
  useEffect(() => {
    const { showFavoritesOnly, showSelectedOnly } = toolbarOptionsModel;

    if (!showFavoritesOnly && !showSelectedOnly) {
      if (searchTerm.length === 0) {
        // No filters and no search term, return the entire list
        setListItemsFiltered(listItems);
      } else {
        // No filters, but search term is present, filter by search term
        setListItemsFiltered(listItems.filter((option) => option.text.toLowerCase().includes(searchTerm)));
      }
      return;
    }

    // At least one filter is active
    setListItemsFiltered(
      listItems.filter((option) => {
        const matchesSearch = option.text.toLowerCase().includes(searchTerm);
        const matchesFilter = (showFavoritesOnly && option.favorite) || (showSelectedOnly && option.selected);

        return matchesFilter && matchesSearch;
      }),
    );
  }, [searchTerm, toolbarOptionsModel, listItems]);
  /**
   * handle text change event
   */
  const handleOnTextChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOpen === false) {
      setIsOpen(true);
    }
    const filterValue = e.target.value;
    setSearchTerm(filterValue);
    setHeightLightIndex(-1);
  };

  const handleToolBarOptionsChangedEvent = (value: ToolbarOptionsModel) => {
    setToolbarOptionsModel(value);
  };

  const handleOnFavoriteUpdatedEvent = (updatedItem: OptionApiModel) => {
    const updatedItems = listItems.map((item) => (item.code === updatedItem.code ? updatedItem : item));
    setListItems(updatedItems);
  };

  /**
   * go though all items and change to select none
   */
  const handleOnSelectNoneEvent = () => {
    const updatedListItems = listItems.map(
      (item) => (item.selected ? item.cloneWithSelected(false) : item), // Only update items where selected is true
    );

    setListItems(updatedListItems);
  };

  /**
   * go though all VISIBLE items and select them
   */
  const handleOnSelectAllEvent = () => {
    // Update only the items where `isSelected` is currently false
    const updatedFilteredItems = listItemsFiltered
      .filter((item) => !item.selected) // Only process items that are not selected
      .map((item) => item.cloneWithSelected(true)); // Clone with `selected` set to true

    const updatedListItems = listItems.map((item) => {
      // Check if the item is in the filtered list that needs updating
      const matchingItem = updatedFilteredItems.find((filteredItem) => filteredItem.code === item.code);
      return matchingItem ? matchingItem : item; // Update if found, otherwise keep the original
    });

    setListItems(updatedListItems);
  };

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input ref={inputRef} type="text" placeholder="Select an option..." value={searchTerm} onKeyDown={handleKeyDownEvent} onClick={handleInputBoxClickEvent} onChange={handleOnTextChangeEvent} />
        {isOpen && (
          <div className="ui-region-popup" ref={containerRef}>
            <DropDownToolbar value={toolbarOptionsModel} onChange={handleToolBarOptionsChangedEvent} onSelectAll={handleOnSelectAllEvent} onSelectNone={handleOnSelectNoneEvent} />
            <div className="option-list-container">
              <DropDownNoOptionsFound listItemsFiltered={listItemsFiltered} />
              <DropDownList
                filteredOptions={listItemsFiltered}
                optionRefs={optionRefs}
                handleMouseOverEvent={handleMouseOverEvent}
                handleOnFavoriteUpdatedEvent={handleOnFavoriteUpdatedEvent}
                handleOnOptionSelectedEvent={handleOnOptionSelectedEvent}
              />
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0015MultiSelect;
