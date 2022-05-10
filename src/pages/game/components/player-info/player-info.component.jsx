import "./player-info.component.scss";
import "./../../../../theme/flex.scss";
import "./../../../../theme/theme.scss";
import * as image from "../../../../assets/exports/images";
import TranslationService from "../../../../services/translation.service"

const PlayerInfoComponent = (props) => {
  const translationService = new TranslationService();
  const handlePlayerInfoClick = (e) => {
    if (props.currentPlayer?.isTurn) {
      props.handlePlayerInfoClick(e, props.id);
    }
  };
  return (
    <div onClick={handlePlayerInfoClick} className="qcg-player-info full-width">
      <div
        className={`game-wrapper qcg-flex qcg-flex-column qcg-flex-align-center ${
          props.isTurn && "player-active"
        }`}
      >
        <div className="image">
          <img src={props.picture}></img>
        </div>
        <div className="info">
          <div className="info-wrapper qcg-flex qcg-flex-center full-height">
            <span className="qcg-flex-70 full-width">{props.fullName}</span>
            <img className="qcg-flex-15" src={image.cards_for_player}></img>
            <span className="qcg-flex-15">{props.cardsLength}</span>
          </div>
        </div>
      </div>
      <div className="player-points qcg-flex qcg-flex-center">
        <div>
          {props.points}
        </div>
      </div>
      {
        props.isDonePlaying &&
        <div className="done-playing-wrapper qcg-flex qcg-flex-center">
          <div className="done-playing">
            {translationService.translate.PlayerInfoComponent.donePlayingMessage}
          </div>
        </div>
      }
    </div>
  );
};

export default PlayerInfoComponent;
