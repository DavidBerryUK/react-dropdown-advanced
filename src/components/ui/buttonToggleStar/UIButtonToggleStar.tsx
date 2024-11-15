import UIIconStar from "../../icons/UIIconStar";
import UIIconStarSolid from "../../icons/UIIconStarSolid";
import "./Styles.scss";

interface iProperties {
  showFavouritesOnly: boolean;
  onShowFavouritesOnlyChanged: (value: boolean) => void;
}

const UIButtonToggleStar: React.FC<iProperties> = (props) => {
  const handleOnButtonClickedEvent = () => {
    props.onShowFavouritesOnlyChanged(!props.showFavouritesOnly);
  };

  return (
    <div className="ui-botton-toggle-star" onClick={handleOnButtonClickedEvent}>
      {!props.showFavouritesOnly && <UIIconStar />}
      {props.showFavouritesOnly && <UIIconStarSolid />}
    </div>
  );
};

export default UIButtonToggleStar;
