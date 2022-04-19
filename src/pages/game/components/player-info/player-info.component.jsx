import "./player-info.component.scss";
import "./../../../../theme/flex.scss";
import "./../../../../theme/theme.scss";
import * as image from "../../../../assets/exports/images";

const PlayerInfoComponent = (props) => {
  const handlePlayerInfoClick = () => {
    props.handlePlayerInfoClick(props.id);
  };
  return (
    <div onClick={handlePlayerInfoClick} className="qcg-player-info full-width">
      <div className="game-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
        <div className="image">
          <img src={image.banana}></img>
        </div>
        <div className="info">
          <div className="qcg-flex qcg-flex-center full-height">
            <span>Fadi</span>
            <img src={image.cards_for_player}></img>
            <span>16</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoComponent;
