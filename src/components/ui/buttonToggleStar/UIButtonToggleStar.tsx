import UIIconStar from "../../icons/UIIconStar";
import UIIconStarSolid from "../../icons/UIIconStarSolid";
import "./Styles.scss";

interface iProperties {
  showFavoritesOnly: boolean;
  onShowFavoritesOnlyChanged: (value: boolean) => void;
}

const UIButtonToggleStar: React.FC<iProperties> = (props) => {
  const handleOnButtonClickedEvent = () => {
    props.onShowFavoritesOnlyChanged(!props.showFavoritesOnly);
  };

  return (
    <div className="ui-botton-toggle-star" onClick={handleOnButtonClickedEvent}>
      {!props.showFavoritesOnly && <UIIconStar />}
      {props.showFavoritesOnly && <UIIconStarSolid />}
    </div>
  );
};

export default UIButtonToggleStar;
