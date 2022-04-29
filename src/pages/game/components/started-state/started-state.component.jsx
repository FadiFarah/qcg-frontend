import "./started-state.component.scss";
import "../../../../theme/theme.scss";
import "../../../../theme/flex.scss";
import * as image from "./../../../../assets/exports/images";
import PlayerInfoComponent from "../player-info/player-info.component";
import HandCardComponent from "../hand-card/hand-card.component";
import PopOverComponent from "../pop-over/pop-over.component";
import { useState } from "react";

const StartedStateComponent = (props) => {
  const [cardNumber, setCardsNumber] = useState(4);
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleInfoButtonClick = (description) => {
    props.handleInfoButtonClick(description);
  };

  const handlePlayerInfoClick = (id) => {
    setId(id);
    setIsOpen(true);
  };

  const generateCardCategoryImages = (categoryGroup) => {
    var cardsOfCategoryGroup = props.startingCards?.filter(
      (card) => card.categoryGroup === categoryGroup
    );
    var cardCategoryImages = cardsOfCategoryGroup.map((card) => {
      if (
        props.currentPlayer?.cards?.find(
          (playerCard) => playerCard.cardName === card.cardName
        )
      ) {
        return {
          isActive: true,
          imageURL: card.imageURL,
        };
      } else {
        return {
          isActive: false,
          imageURL: card.imageURL,
        };
      }
    });

    return cardCategoryImages;
  };

  return (
    <div className="qcg-started-state qcg-flex full-height">
      <PopOverComponent id={id} isOpen={isOpen}></PopOverComponent>
      <div className="game-players qcg-flex-5">
        <div className="qcg-flex qcg-flex-column qcg-flex-justify-space-evenly qcg-flex-center full-height">
          {props.players.map((player) => {
            return (
              <div id={player.userId}>
                <PlayerInfoComponent
                  id={player.userId}
                  picture={player.picture}
                  cardsLength={player.cards.length}
                  fullName={player.fullName}
                  isTurn={player.isTurn}
                  handlePlayerInfoClick={handlePlayerInfoClick}
                ></PlayerInfoComponent>
              </div>
            );
          })}
        </div>
      </div>
      <div className="game-content qcg-flex qcg-flex-column-reverse full-height full-width">
        <div
          onClick={props.handleMiddleDeckClick}
          className={`deck-on-table ${
            !props.currentPlayer.isTurn && "disabled-deck"
          }`}
        >
          <img src={image.MidDeck}></img>
          <div className="remaining-cards">{props.remainingCards.length}</div>
        </div>
        <div className="hand-cards qcg-flex qcg-flex-justify-center">
          <div className="cards-wrapper qcg-flex">
            {props.currentPlayer?.cards?.map((card, i) => {
              return (
                <div key={i} className="card qcg-flex qcg-flex-column">
                  <HandCardComponent
                    handleInfoButtonClick={handleInfoButtonClick}
                    categoryGroup={card?.categoryGroup}
                    description={card?.description}
                    cardName={card?.cardName}
                    imageURL={card?.imageURL}
                    cardCategoryImages={generateCardCategoryImages(
                      card?.categoryGroup
                    )}
                  ></HandCardComponent>
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
