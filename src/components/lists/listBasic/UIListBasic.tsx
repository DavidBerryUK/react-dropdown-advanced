import "./Styles.scss";
import UIListToolbar from "../components/UIListToolbar";
import useDataLoader from "../hooks/useDataLoader";

const UIListBasic: React.FC = () => {
  const {
    options,
    layoutTime,
    renderTime,
    handleOnListClearEvent,
    handleOnLoadCustomersLargeEvent,
    handleOnLoadCustomersSmallEvent,
    handleOnLoadSuppliersSmallEvent,
    handleOnLoadSuppliersLargeEvent,
  } = useDataLoader();

  /*****************************************************************/
  /* Event Handlers for loading and clearing lists
  /*****************************************************************/

  return (
    <div className="demo-container">
      <h2>Display basic lists with timings</h2>
      <UIListToolbar
        layoutTime={layoutTime}
        renderTime={renderTime}
        listSize={options.length}
        onClear={handleOnListClearEvent}
        onLoadCustomerLarge={handleOnLoadCustomersLargeEvent}
        onLoadCustomersSmall={handleOnLoadCustomersSmallEvent}
        onLoadSuppliersLarge={handleOnLoadSuppliersLargeEvent}
        onLoadSuppliersSmall={handleOnLoadSuppliersSmallEvent}
      />
      <div className="ui-virtual-list">
        <ol>
          {options.map((item) => (
            <li key={item.code}>{item.text}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default UIListBasic;
