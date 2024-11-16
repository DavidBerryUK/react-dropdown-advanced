import UIIconCircle from "../icons/UIIconCircle";
import UIIconTickCircle from "../icons/UIIconTickCircle";

interface iProperties {
  value: boolean;
  onChanged: (value: boolean) => void;
}

const UISwitchTickBox: React.FC<iProperties> = (props) => {
  const handleOnButtonClickedEvent = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.onChanged(!props.value);
  };

  return (
    <div className="ui-switch-tick-box" onClick={handleOnButtonClickedEvent}>
      {!props.value && <UIIconCircle />}
      {props.value && <UIIconTickCircle />}
    </div>
  );
};

export default UISwitchTickBox;
