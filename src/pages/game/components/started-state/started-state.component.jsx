import "./started-state.component.scss";
import "../../../../theme/theme.scss";
import "../../../../theme/flex.scss";
import * as image from "./../../../../assets/exports/images";
import PlayerInfoComponent from "../player-info/player-info.component";
import HandCardComponent from "../hand-card/hand-card.component";
import PopOverComponent from "../pop-over/pop-over.component";
import { useState } from "react";
import TranslationService from "../../../../services/translation.service";

const StartedStateComponent = (props) => {
  const translationService = new TranslationService();
  const [cardNumber, setCardsNumber] = useState(4);
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleInfoButtonClick = (description) => {
    props.handleInfoButtonClick(description);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handlePlayerInfoClick = (event, id) => {
    var player = props?.players?.find(player => player.userId === id);
    if(player && !player.isDonePlaying) {
      setAnchorEl(event.currentTarget);
      generatePlayerCategoryGroups();
      setId(id);
      setIsOpen(true);
    }
  };

  const categoryGroupClick = (toPlayerUserId, categoryGroup) => {
    handleClose();
    props.onCategoryGroupClick(toPlayerUserId, categoryGroup);
  };

  const generatePlayerCategoryGroups = () => {
    var categoryGroups = props.currentPlayer?.cards?.map((card) => {
      return card.categoryGroup;
    });
    var noDuplicates = categoryGroups?.filter(function (elem, pos) {
      return categoryGroups.indexOf(elem) == pos;
    });
    return noDuplicates;
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
      <PopOverComponent
        id={id}
        isOpen={isOpen}
        categoryGroups={generatePlayerCategoryGroups()}
        handleClose={handleClose}
        anchorEl={anchorEl}
        onCategoryGroupClick={categoryGroupClick}
      ></PopOverComponent>
      <ion-popover
        trigger={props.cardNotifyDetails?.fromPlayerUserId}
        side={translationService.translate.general.direction === "qcg-ltr" ? "right" : "left"}
        is-open={props.cardNotifyDetails?.isOpen}
      >
        <ion-item>
          <div className="popover-notify-wrapper qcg-flex qcg-flex-column qcg-flex-center">
            <div>{props.cardNotifyDetails?.toPlayerFullName}, {translationService.translate.startedStateComponent.requestMessage}</div>
            <HandCardComponent
              categoryGroup={props.cardNotifyDetails?.card?.categoryGroup}
              cardName={props.cardNotifyDetails?.card?.cardName}
              imageURL={props.cardNotifyDetails?.card?.imageURL}
              description={props.cardNotifyDetails?.card?.description}
            />
          </div>
        </ion-item>
      </ion-popover>
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
                  isDonePlaying={player.isDonePlaying}
                  handlePlayerInfoClick={handlePlayerInfoClick}
                  currentPlayer={props.currentPlayer}
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
            (!props.currentPlayer.isTurn || props.remainingCards.length === 0) && "disabled-deck"
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
