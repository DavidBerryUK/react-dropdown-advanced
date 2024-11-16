import "./Styles.scss";
import DemoContainer from "../../container/DemoContainer";
import DropDownItem from "./DropDownItem";
import FactoryListData from "../../../factories/FactoryListData";
import OptionApiModel from "../../../models/OptionApiModel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useAutoItemFocus from "./hooks/UseAutoItemFocus";
import useAutoPopupDismiss from "./hooks/UseAutoPopupDismiss";
import useKeyboardEventsHandlers from "./hooks/UseKeyboardEventsHandlers";
import useMouseEventsHandler from "./hooks/UseMouseEventsHandler";

const version = "12";
const className = "demo-0012";
const title = "Favorites (Failed)";
const description = "allow selection of favorite items - failed - this is inefficient as renders list every time selected index changes.";

const DropDown0012Favorites: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<OptionApiModel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());
  const [listItems, setListItems] = useState<Array<OptionApiModel>>(new Array<OptionApiModel>());

  useAutoPopupDismiss(containerRef, inputRef, setIsOpen);
  useAutoItemFocus(optionRefs, highlightIndex);

  useEffect(() => {
    setListItems(FactoryListData.getCustomers());
  }, []);

  const { handleKeyDownEvent } = useKeyboardEventsHandlers(isOpen, highlightIndex, filteredOptions, setHighlightIndex, optionRefs, containerRef, setIsOpen, setValue, setSearchTerm);
  const { handleInputBoxClickEvent, handleOnOptionSelectedEvent, handleMouseOverEvent } = useMouseEventsHandler(isOpen, setIsOpen, setValue, setSearchTerm, setHighlightIndex);

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

  const handleOnFavoriteUpdatedEvent = useCallback(
    (updatedItem: OptionApiModel) => {
      console.log(`Updating item ${updatedItem.text} : ${updatedItem.favorite}`);
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
              {filteredOptions.length === 0 && <div>No options found</div>}
              {filteredOptions.length > 0 &&
                filteredOptions.map((option, index) => {
                  const highlighted = index === highlightIndex;
                  return (
                    <DropDownItem
                      key={option.code}
                      index={index}
                      item={option}
                      ref={(el) => (optionRefs.current[index] = el)}
                      highlighted={highlighted}
                      onSelected={handleOnOptionSelectedEvent}
                      onMouseOver={handleMouseOverEvent}
                      onFavoriteUpdated={handleOnFavoriteUpdatedEvent}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </DemoContainer>
  );
};

export default DropDown0012Favorites;
