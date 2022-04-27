import "./game.page.scss";
import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints, States } from "../../constants";
import HomePage from "../home/home.page";
import RoomsListPage from "../rooms/rooms-list/rooms-list.page";
import PopupMessageComponent from "../../components/popup-message/popup-message.component";
import StartedStateComponent from "./components/started-state/started-state.component";
import WaitingStateComponent from "./components/waiting-state/waiting-state.component";
import AuthenticationService from "../../services/authentication.service";
import * as signalR from "@microsoft/signalr";
import ChatMessages from "./components/chat/chat-messages.component";
import { list } from "firebase/storage";
import { useAuth0 } from "@auth0/auth0-react";
import LoaderCompletedComponent from "../../components/loader-completed/loader-completed.component";

const GamePage = () => {
  const { id } = useParams();
  const authenticationService = new AuthenticationService();
  const navigationService = useNavigate();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [isLoadingGame, setIsLoadingGame] = useState(true);

  const [popupModalSettings, setPopupModalSettings] = useState({});
  const [popupAlert, setPopupAlert] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [remainingCards, setRemainigCards] = useState([]);
  const [room, setRoom] = useState({});
  const [players, setPlayers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [isMaster, setIsMaster] = useState(false);
  const [isChatDisplay, setIsChatDisplay] = useState(false);
  const [chatMessagesList, setChatMessagesList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const chatBoxRef = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsChatDisplay(!isChatDisplay);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsChatDisplay(false);
  };

  const open = Boolean(anchorEl);
  const popOverId = open ? "chat" : undefined;

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

  const handleNewChatMessageClick = async (message) => {
    const bodyDetails = {
      roomId: id,
      fullName:
        authenticationService.getAuthenticationInfo().userDetails.firstName +
        " " +
        authenticationService.getAuthenticationInfo().userDetails.lastName,
      chatMessage: message,
    };
    await authenticationService.post(
      `${Endpoints.SignalRGameEndpointPrefix}/newChatMessage`,
      bodyDetails
    );
  };

  useEffect(() => {
    hubConnection.start().then(() => {
      hubConnection.on("UserConnected", async (connectionId) => {
        if (connectionId === hubConnection.connectionId) {
          const bodyDetails = {
            connectionId: hubConnection.connectionId,
            roomId: id,
            userId: localStorage.getItem("userId"),
          };
          await authenticationService.post(
            `${Endpoints.SignalRGameEndpointPrefix}/addtogroup`,
            bodyDetails
          );
        }
        authenticationService
          .get(Endpoints.RoomById.replace("{0}", id))
          .then((resultData) => {
            var roomById = resultData.data;
            setRoom(roomById);
            setPlayers(roomById.players);
            setRemainigCards(roomById.remainingCards);
            setRoomName(roomById.roomName);
            setIsLoadingGame(false);
            var masterRoom = roomById.players.find((player) => player.isMaster);
            if (
              masterRoom &&
              masterRoom.userId === localStorage.getItem("userId")
            ) {
              setIsMaster(true);
            }
          });
      });

      hubConnection.on("UserDisconnected", () => {
        console.log("User Disconnected");
      });

      hubConnection.on("gameDataUpdated", () => {
        console.log("game data updated");
        authenticationService
          .get(Endpoints.RoomById.replace("{0}", id))
          .then((resultData) => {
            var roomById = resultData.data;
            setRoom(roomById);
            setPlayers(roomById.players);
            var masterRoom = roomById.players.find((player) => player.isMaster);
            if (
              masterRoom &&
              masterRoom.userId === localStorage.getItem("userId")
            ) {
              setIsMaster(true);
            }
          });
      });

      hubConnection.on("gameStarted", () => {
        setIsWaiting(false);
      });

      hubConnection.on("newChatMessage", (fullName, chatMessage) => {
        setChatMessagesList((chatMessagesList) => [
          ...chatMessagesList,
          `${fullName}: ${chatMessage}`,
        ]);
        setTimeout(() => {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }, 100);
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

  if (!isLoading && !isAuthenticated) loginWithRedirect();
  else {
    return (
      <div className="qcg-game-page">
        {isLoadingGame && <LoaderCompletedComponent></LoaderCompletedComponent>}

        {isWaiting ? (
          <div className="qcg-flex qcg-flex-center full-height">

            <WaitingStateComponent
              isMaster={isMaster}
              handleStartClick={handleStartClick}
              players={players}
              roomName={roomName}
            ></WaitingStateComponent>
          </div>
        ) : (
          <StartedStateComponent
            handleInfoButtonClick={handleInfoButtonClick}
            remainingCards={remainingCards}
            players={players}
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

        {isChatDisplay && (
          <ChatMessages
            id={popOverId}
            isOpen={isChatDisplay}
            triggerId="chat"
            handleNewChatMessageClick={handleNewChatMessageClick}
            chatMessagesList={chatMessagesList}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            chatBoxRef={chatBoxRef}
          />
        )}
        <div className="floating-button">
          <ion-fab horizontal="end" vertical="bottom" slot="fixed">
            <ion-fab-button id="chat" onClick={(e) => handleClick(e)}>
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </ion-fab-button>
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
}

export default GamePage;
