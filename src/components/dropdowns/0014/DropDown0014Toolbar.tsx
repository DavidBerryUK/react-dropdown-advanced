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

const version = "14";
const className = "demo-0014";
const title = "Toolbar";
const description = "Improve drop down layout, add a toolbar, re-enable mouse hover over";

const DropDown0014ToolBar: React.FC = () => {
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

  const [toolbarOptionsModel, SetToolbarOptionsModel] = useState<ToolbarOptionsModel>(new ToolbarOptionsModel());

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
    const customers = FactoryListData.getCustomers();
    setListItems(customers);
  }, []);

  useEffect(() => {
    const showFavoritesOnly = toolbarOptionsModel.showFavoritesOnly;

    if (showFavoritesOnly) {
      setListItemsFiltered(listItems.filter((option) => option.favorite === true && option.text.toLowerCase().includes(searchTerm)));
    } else {
      setListItemsFiltered(listItems.filter((option) => option.text.toLowerCase().includes(searchTerm)));
    }
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
    SetToolbarOptionsModel(value);
  };

  const handleOnFavoriteUpdatedEvent = (updatedItem: OptionApiModel) => {
    const updatedItems = listItems.map((item) => (item.code === updatedItem.code ? updatedItem : item));
    setListItems(updatedItems);
  };

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input ref={inputRef} type="text" placeholder="Select an option..." value={searchTerm} onKeyDown={handleKeyDownEvent} onClick={handleInputBoxClickEvent} onChange={handleOnTextChangeEvent} />
        {isOpen && (
          <div className="ui-region-popup" ref={containerRef}>
            <DropDownToolbar value={toolbarOptionsModel} onChange={handleToolBarOptionsChangedEvent} />
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

export default DropDown0014ToolBar;
