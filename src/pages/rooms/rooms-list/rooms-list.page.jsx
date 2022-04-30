import { useState, useEffect } from "react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as signalR from "@microsoft/signalr";

import "react-tabs/style/react-tabs.css";
import GamePage from "./../../game/game.page";
import PopupMessageComponent from "../../../components/popup-message/popup-message.component";
import InfoCardComponent from "../../../components/info-card/info-card.component";
import { Endpoints, Limitations, States } from "../../../constants";
import AuthenticationService from "../../../services/authentication.service";
import { MessageStyle } from "../../../local.entities";
import "./rooms-list.page.scss";
import "./../../../theme/theme.scss";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoaderCompletedComponent from "../../../components/loader-completed/loader-completed.component";
import TranslationService from "../../../services/translation.service";

const RoomsListPage = () => {
  const authenticationService = new AuthenticationService();
  const translationService = new TranslationService();
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigationService = useNavigate();
  const [roomsList, setRoomsList] = useState([]);
  const [chosenRoom, setChosenRoom] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [popupAlert, setPopupAlert] = useState(false);
  const [popupModalSettings, setPopupModalSettings] = useState({});
  const [inputValidation, setInputValidation] = useState(false);
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(Endpoints.SignalRRoomsListEndpointPrefix)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const onRoomClicked = (id) => {
    const roomById = roomsList.find((room) => {
      return room._id === id;
    });

    if (roomById.isWaiting) {
      if (
        roomById.players &&
        roomById.players.length < Limitations.MaxPlayers
      ) {
        if (roomById.isPublic) {
          navigationService(States.Game + "/" + id, { state: { GamePage } });
        } else {
          setPopupModalSettings({
            title: translationService.translate.roomsListPage.privateRoomPasswordPopup.title,
            input: {
              placeholder: translationService.translate.roomsListPage.privateRoomPasswordPopup.inputPlaceholder,
              type: "password",
              errorMessage: translationService.translate.roomsListPage.privateRoomPasswordPopup.errorMessage,
            },
            action: translationService.translate.popupModelSettings.confimAction,
            hasCancel: true,
          });
          setPopupAlert(true);
        }
      } else {
        setPopupModalSettings({
          title: translationService.translate.roomsListPage.popupRoomFull.title,
          input: null,
          action: translationService.translate.roomsListPage.popupRoomFull.action,
          hasCancel: false,
        });
        setPopupAlert(true);
      }
    } else {
      setPopupModalSettings({
        title: translationService.translate.roomsListPage.popupRoomStarted.title,
        input: null,
        action: translationService.translate.roomsListPage.popupRoomStarted.action,
        hasCancel: false,
      });
      setPopupAlert(true);
    }

    setChosenRoom(roomById);
  };

  const handlePopupAlertClose = (value) => {
    if (value) {
      if (!chosenRoom.isPublic && value !== chosenRoom.roomPassword) {
        setInputValidation(true);
        return;
      } else {
        navigationService(
          States.Game + "/" + chosenRoom._id + "/" + chosenRoom.roomPassword,
          { state: { GamePage } }
        );
      }
    }
    setInputValidation(false);
    setPopupAlert(false);
    setInputValue("");
  };

  const generateToInfoCard = (room) => {
    return {
      ribbonTitle: room.categoryName,
      ribbonIcon: {
        title: null,
        value: room.isPublic ? lockOpenOutline : lockClosedOutline,
        style: room.isPublic ? MessageStyle.Good : MessageStyle.Exclamation,
      },
      cardTitle: room.roomName,
      infoList: [
        {
          title: translationService.translate.roomsListPage.roomCurrentUsers,
          value: `${room.players.length}/${Limitations.MaxPlayers}`,
          style: MessageStyle.Normal,
        },
        {
          title: translationService.translate.roomsListPage.roomStatus.statusTitle,
          value: room.isWaiting ? translationService.translate.roomsListPage.roomStatus.statusWaiting : translationService.translate.roomsListPage.roomStatus.statusStarted,
          style: room.isWaiting ? MessageStyle.Good : MessageStyle.Exclamation,
        },
      ],
    };
  };

  const getAllRooms = () => {
    authenticationService
      .get(Endpoints.Rooms)
      .then((result) => {
        setRoomsList(result.data);
        setIsLoadingRooms(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    hubConnection.start().then(() => {
      console.log("connected");
      getAllRooms();

      hubConnection.on("roomsListUpdated", () => {
        getAllRooms();
      });
    });
  }, []);

  if (!isLoading && !isAuthenticated) loginWithRedirect();
  else {
    return (
      <div className="qcg-rooms-list-page">
        <Tabs>
          <a href={States.RoomCreation}>{translationService.translate.roomsListPage.roomListCreate}</a>
          <h1 className="qcg-flex-align-self-center">{translationService.translate.roomsListPage.roomsListTitle}</h1>
          <TabList>
            <Tab>
              <p>{translationService.translate.roomsListPage.roomsListAllRooms}</p>
            </Tab>
            <Tab>
              <p>{translationService.translate.roomsListPage.roomsListPublicRooms}</p>
            </Tab>
            <Tab>
              <p>{translationService.translate.roomsListPage.roomsListPrivateRooms}</p>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="panel-content">
              {roomsList.map((room) => {
                return (
                  <InfoCardComponent
                    handleClick={onRoomClicked}
                    key={room._id}
                    id={room._id}
                    data={generateToInfoCard(room)}
                  />
                );
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {roomsList.map((room) => {
                return (
                  room.isPublic && (
                    <InfoCardComponent
                      handleClick={onRoomClicked}
                      key={room._id}
                      id={room._id}
                      data={generateToInfoCard(room)}
                    />
                  )
                );
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {roomsList.map((room) => {
                return (
                  !room.isPublic && (
                    <InfoCardComponent
                      handleClick={onRoomClicked}
                      key={room._id}
                      id={room._id}
                      data={generateToInfoCard(room)}
                    />
                  )
                );
              })}
            </div>
          </TabPanel>
        </Tabs>

        <PopupMessageComponent
          inputValidation={inputValidation}
          inputValue={inputValue}
          setInputValue={(value) => setInputValue(value)}
          popupAlert={popupAlert}
          handlePopupAlertClose={handlePopupAlertClose}
          popupModalSettings={popupModalSettings}
        />

        {isLoadingRooms && (
          <LoaderCompletedComponent></LoaderCompletedComponent>
        )}
      </div>
    );
  }
};

export default RoomsListPage;
