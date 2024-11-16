import UIIconStar from "../icons/UIIconStar";
import UIIconStarSolid from "../icons/UIIconStarSolid";

interface iProperties {
  value: boolean;
  onChanged: (value: boolean) => void;
}

const UISwitchFavorite: React.FC<iProperties> = (props) => {
  const handleOnButtonClickedEvent = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.onChanged(!props.value);
  };

  return (
    <div className="ui-switch-favorite" onClick={handleOnButtonClickedEvent}>
      {!props.value && <UIIconStar />}
      {props.value && <UIIconStarSolid />}
    </div>
  );
};

export default UISwitchFavorite;
