interface IProperties {
  onClear: () => void;
  onLoadCustomersSmall: () => void;
  onLoadCustomerLarge: () => void;
  onLoadSuppliersSmall: () => void;
  onLoadSuppliersLarge: () => void;
  listSize: number;
}

const UIListToolbar: React.FC<IProperties> = (props) => {
  return (
    <div>
      <button onClick={props.onClear}>Clear</button>
      <button onClick={props.onLoadCustomersSmall}>Customers (small)</button>
      <button onClick={props.onLoadCustomerLarge}>Customers (long)</button>
      <button onClick={props.onLoadSuppliersSmall}>Suppliers (small)</button>
      <button onClick={props.onLoadSuppliersLarge}>Suppliers (long)</button>
    </div>
  );
};

export default UIListToolbar;
