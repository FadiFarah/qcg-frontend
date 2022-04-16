import "./started-state.component.scss";
import "../../../../theme/theme.scss";
import "../../../../theme/flex.scss";
import * as image from "./../../../../assets/exports/images";
import PlayerInfoComponent from "../player-info/player-info.component";
import HandCardComponent from "../hand-card/hand-card.component";
import {useState} from "react";

const StartedStateComponent = (props) => {
  const [cardNumber,
    setCardsNumber] = useState(4);
  const handleInfoButtonClick = () => {
    props.handleInfoButtonClick();
  }

  return (
    <div className="qcg-started-state qcg-flex full-height">
      <div className="game-players qcg-flex-5">
        <div
          className="qcg-flex qcg-flex-column qcg-flex-justify-space-evenly qcg-flex-center full-height">
          <PlayerInfoComponent></PlayerInfoComponent>
          <PlayerInfoComponent></PlayerInfoComponent>
          <PlayerInfoComponent></PlayerInfoComponent>
          <PlayerInfoComponent></PlayerInfoComponent>
        </div>
      </div>
      <div
        className="game-content qcg-flex qcg-flex-column-reverse full-height full-width">
        <div onClick={() => setCardsNumber(cardNumber + 1)} className="deck-on-table">
          <img src={image.MidDeck}></img>
        </div>
        <div className="hand-cards qcg-flex qcg-flex-justify-center">
          <div className="cards-wrapper qcg-flex">
            {Array.from(Array(cardNumber), (e, i) => {
              return (
                <div key={i} className="card qcg-flex qcg-flex-column">
                  <HandCardComponent handleInfoButtonClick={handleInfoButtonClick}></HandCardComponent>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartedStateComponent;