import EnumToolbarButtonType from "./EnumToolbarButtonType";

interface iProperties {
  type: EnumToolbarButtonType;
  onClicked: (type: EnumToolbarButtonType) => void;
}

const UIToolbarButton: React.FC<iProperties> = (props) => {
  const handleOnButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.onClicked(props.type);
  };

  var message = "";

  switch (props.type) {
    case EnumToolbarButtonType.SelectAll:
      message = "all";
      break;

    case EnumToolbarButtonType.SelectNone:
      message = "none";
      break;

    case EnumToolbarButtonType.ShowOnlySelected:
      message = "show sel";
      break;

    case EnumToolbarButtonType.ShowAll:
      message = "show all";
      break;
  }

  return (
    <button className="ui-toolbar-button" onClick={handleOnButtonClicked}>
      {message}
    </button>
  );
};

export default UIToolbarButton;
