import "./game.page.scss";
import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints, States } from "../../constants";
import HomePage from "../home/home.page";
import RoomsListPage from "../rooms/rooms-list/rooms-list.page";
import PopupMessageComponent from "../../components/popup-message/popup-message.component";
import StartedStateComponent from "./components/started-state/started-state.component";
import WaitingStateComponent from "./components/waiting-state/waiting-state.component";
import AuthenticationService from "../../services/authentication.service";
import * as signalR from "@microsoft/signalr";

const GamePage = () => {
  const { id } = useParams();
  const authenticationService = new AuthenticationService();
  const navigationService = useNavigate();

  const [popupModalSettings, setPopupModalSettings] = useState({});
  const [popupAlert, setPopupAlert] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [room, setRoom] = useState({});
  const [players, setPlayers] = useState([]);
  const [isMaster, setIsMaster] = useState(false);
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(Endpoints.SignalRGameEndpointPrefix)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const handlePopupAlertClose = () => {
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

  const handleStartClick = async () => {
    const bodyDetails = {
      roomId: id,
    };
    await authenticationService.post(
      `${Endpoints.SignalRGameEndpointPrefix}/gameStarted`,
      bodyDetails
    );
  };

  useEffect(() => {
    hubConnection.start().then(() => {
      hubConnection.on("UserConnected", (connectionId) => {
        if (hubConnection.connectionId === connectionId) {
          const bodyDetails = {
            connectionId: hubConnection.connectionId,
            roomId: id,
            userId: localStorage.getItem("userId"),
          };
          authenticationService
            .post(
              `${Endpoints.SignalRGameEndpointPrefix}/addtogroup`,
              bodyDetails
            )
            .then(() => {
              authenticationService
                .get(Endpoints.RoomById.replace("{0}", id))
                .then((resultData) => {
                  setRoom(resultData.data);
                  setPlayers(resultData.data.currentUsers);
                  if (
                    resultData.data.roomMaster._id ===
                    localStorage.getItem("userId")
                  ) {
                    setIsMaster(true);
                  }
                });
            });
        }
      });

      hubConnection.on("UserDisconnected", () => {
        console.log("User Disconnected");
      });

      hubConnection.on("gameDataUpdated", () => {
        console.log("game data updated");
        authenticationService
          .get(Endpoints.RoomById.replace("{0}", id))
          .then((resultData) => {
            setRoom(resultData.data);
            setPlayers(resultData.data.currentUsers);
          });
      });

      hubConnection.on("gameStarted", () => {
        setIsWaiting(false);
      });

      hubConnection.onclose(() => {
        console.log("Connection Closed");
        setTimeout(async () => {
          console.log("Connection Closed");
          await hubConnection.start();
        }, 5000);
      });
    });
  }, []);

  return (
    <div className="qcg-game-page">
      {isWaiting ? (
        <div className="qcg-flex qcg-flex-center full-height">
          <WaitingStateComponent
            isMaster={isMaster}
            handleStartClick={handleStartClick}
            players={players}
            room={room}
          ></WaitingStateComponent>
        </div>
      ) : (
        <StartedStateComponent
          handleInfoButtonClick={handleInfoButtonClick}
        ></StartedStateComponent>
      )}
      <div className="floating-button">
        <ion-fab horizontal="end" vertical="top" slot="fixed">
          <ion-fab-button>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="bottom">
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
