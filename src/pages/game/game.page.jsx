import "./game.page.scss";
import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import * as image from "../../assets/exports/images";
import PlayerInfoComponent from "./components/player-info/player-info.component";
import HandCardComponent from "./components/hand-card/hand-card.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { States } from "../../constants";
import HomePage from "../home/home.page";
import RoomsListPage from "../rooms/rooms-list/rooms-list.page";
import PopupMessageComponent from "../../components/popup-message/popup-message.component";

const GamePage = () => {
  const [cardNumber, setCardsNumber] = useState(4);
  const [popupModalSettings, setPopupModalSettings] = useState({});
  const [popupAlert, setPopupAlert] = useState(false);
  const navigationService = useNavigate();

  const handlePopupAlertClose = (e) => {
    setPopupAlert(false);
  };

  const handleInfoButtonClick = () => {
    setPopupModalSettings({
      title: "Lorem epsososad asd asjd asdj askjd asdasdkhj",
      input: null,
      action: "Ok",
      hasCancel: false,
    });
    setPopupAlert(true);
  };

  return (
    <div className="qcg-game-page">
      <div className="qcg-flex full-height">
        <div className="game-players qcg-flex-5">
          <div className="qcg-flex qcg-flex-column qcg-flex-justify-space-evenly qcg-flex-center full-height">
            <PlayerInfoComponent></PlayerInfoComponent>
            <PlayerInfoComponent></PlayerInfoComponent>
            <PlayerInfoComponent></PlayerInfoComponent>
            <PlayerInfoComponent></PlayerInfoComponent>
          </div>
        </div>
        <div className="game-content qcg-flex qcg-flex-column-reverse full-height full-width">
          <div
            onClick={() => setCardsNumber(cardNumber + 1)}
            className="deck-on-table"
          >
            <img src={image.MidDeck}></img>
          </div>
          <div className="hand-cards qcg-flex qcg-flex-justify-center">
            <div className="cards-wrapper qcg-flex">
              {Array.from(Array(cardNumber), (e, i) => {
                return (
                  <div key={i} className="card qcg-flex qcg-flex-column">
                    <HandCardComponent
                      handleInfoButtonClick={handleInfoButtonClick}
                    ></HandCardComponent>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="floating-button">
        <ion-fab horizontal="end" vertical="top" slot="fixed">
          <ion-fab-button>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="start">
            <ion-fab-button
              onClick={(e) =>
                navigationService(States.Main, { state: { HomePage } })
              }
              color="light"
            >
              <ion-label>Main Menu</ion-label>
            </ion-fab-button>

            <ion-fab-button
              onClick={(e) =>
                navigationService(States.RoomsList, {
                  state: { RoomsListPage },
                })
              }
              color="light"
            >
              <ion-label>Leave game</ion-label>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>
      </div>
      <PopupMessageComponent
        popupAlert={popupAlert}
        handlePopupAlertClose={handlePopupAlertClose}
        popupModalSettings={popupModalSettings}
      />
    </div>
  );
};

export default GamePage;
