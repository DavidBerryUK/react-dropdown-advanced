import "./Styles.scss";
import React from "react";

import DemoContainer from "../../container/DemoContainer";
import DropDownList from "./DropDownList";
import DropDownNoOptionsFound from "./DropDownNoOptionsFound";
import DropDownToolbarHeader from "./toolbar/DropDownToolbarHeader";
import useViewController from "./hooks/UseViewController";

const version = "17";
const className = "demo-0017";
const title = "View Controller";
const description = "View Controller, Width, Toolbars, Clear Text Button";

interface IProperties {
  width?: number;
}

const DropDown0017Toolbars: React.FC<IProperties> = (props) => {
  const {
    //
    // STATE
    //
    containerRef,
    inputRef,
    isOpen,
    listItemsFiltered,
    optionRefs,
    searchTerm,
    toolbarOptionsModel,

    //
    // EVENT HANDLERS
    //
    handleInputBoxClickEvent,
    handleKeyDownEvent,
    handleMouseOverEvent,
    handleOnFavoriteUpdatedEvent,
    handleOnOptionSelectedEvent,
    handleOnSelectAllEvent,
    handleOnSelectNoneEvent,
    handleOnTextChangeEvent,
    handleToolBarOptionsChangedEvent,
  } = useViewController();

  var dropDownStyle: React.CSSProperties = {};

  if (props.width) {
    dropDownStyle.width = props.width;
  }

  return (
    <DemoContainer className={className} version={version} title={title} description={description}>
      <div className="ui-dropdown">
        <input ref={inputRef} type="text" placeholder="Select an option..." value={searchTerm} onKeyDown={handleKeyDownEvent} onClick={handleInputBoxClickEvent} onChange={handleOnTextChangeEvent} />
        {isOpen && (
          <div className="ui-region-popup" ref={containerRef} style={dropDownStyle}>
            <DropDownToolbarHeader value={toolbarOptionsModel} onChange={handleToolBarOptionsChangedEvent} onSelectAll={handleOnSelectAllEvent} onSelectNone={handleOnSelectNoneEvent} />
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

export default DropDown0017Toolbars;
