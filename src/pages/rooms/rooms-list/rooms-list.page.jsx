import {useState, useEffect} from "react";
import {lockClosedOutline, lockOpenOutline} from "ionicons/icons";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import * as signalR from "@microsoft/signalr";

import "react-tabs/style/react-tabs.css";
import GamePage from "./../../game/game.page"
import PopupMessageComponent from "../../../components/popup-message/popup-message.component";
import InfoCardComponent from "../../../components/info-card/info-card.component";
import {Endpoints, Limitations, States} from "../../../constants";
import AuthenticationService from "../../../services/authentication.service";
import {MessageStyle} from "../../../local.entities";
import "./rooms-list.page.scss";
import "./../../../theme/theme.scss";
import {useNavigate} from "react-router-dom";

const RoomsListPage = () => {
  const authenticationService = new AuthenticationService();
  const navigationService = useNavigate();
  const [roomsList,
    setRoomsList] = useState([]);
  const [chosenRoom,
    setChosenRoom] = useState({});
  const [inputValue,
    setInputValue] = useState("");
  const [popupAlert,
    setPopupAlert] = useState(false);
  const [popupModalSettings,
    setPopupModalSettings] = useState({});
  const [inputValidation,
    setInputValidation] = useState(false);
  const hubConnection = new signalR
    .HubConnectionBuilder()
    .withUrl(Endpoints.SignalRRoomsListEndpointPrefix)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const onRoomClicked = (id) => {
    const roomById = roomsList.find((room) => {
      return room._id === id;
    });

    if (roomById.isWaiting) {
      if (roomById.currentUsers && roomById.currentUsers.length < Limitations.MaxPlayers) {
        if (roomById.isPublic) {
          navigationService(States.Game + "/" + id, {state: {GamePage}})
          console.log("Entered the room");
        } else {
          setPopupModalSettings({
            title: "Enter the room password",
            input: {
              placeholder: "password...",
              type: "password",
              errorMessage: "The password you entered is incorrect!"
            },
            action: "Confirm",
            hasCancel: true
          });
          setPopupAlert(true);
        }
      } else {
        setPopupModalSettings({title: "The room is full. Max number of players reached!", input: null, action: "Ok", hasCancel: false});
        setPopupAlert(true);
        console.log("The room is full. Max number of players reached!");
      }
    } else {
      setPopupModalSettings({title: "The game has already started. You cannot join!", input: null, action: "Ok", hasCancel: false});
      setPopupAlert(true);
      console.log("The room has already started. You cannot join!");
    }

    setChosenRoom(roomById);
  };

  const handlePopupAlertClose = (value) => {
    if (value) {
      if (!chosenRoom.isPublic && value !== chosenRoom.roomPassword) {
        setInputValidation(true);
        return;
      } else {
        navigationService(States.Game + "/" + chosenRoom._id)
      }
    }
    setInputValidation(false);
    setPopupAlert(false);
    setInputValue("");
  };

  const generateToInfoCard = (room) => {
    return {
      ribbonTitle: room.category.categoryName,
      ribbonIcon: {
        title: null,
        value: room.isPublic
          ? lockOpenOutline
          : lockClosedOutline,
        style: room.isPublic
          ? MessageStyle.Good
          : MessageStyle.Exclamation
      },
      cardTitle: room.roomName,
      infoList: [
        {
          title: "Current users",
          value: `${room.currentUsers.length}/${Limitations.MaxPlayers}`,
          style: MessageStyle.Normal
        }, {
          title: "Status",
          value: room.isWaiting
            ? "Waiting"
            : "Started",
          style: room.isWaiting
            ? MessageStyle.Good
            : MessageStyle.Exclamation
        }
      ]
    };
  };

  const getAllRooms = () => {
    authenticationService
      .get(Endpoints.Rooms)
      .then((result) => {
        setRoomsList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    hubConnection
    .start()
    .then(() => {
      console.log("connected");
      getAllRooms();

        hubConnection.on("roomsListUpdated", () => {
          getAllRooms();
        });
      });
  }, []);

  return (
    <div className="qcg-rooms-list-page">
      <Tabs>
        <h1 className="qcg-flex-align-self-center">Rooms</h1>
        <TabList>
          <Tab>
            <p>All rooms</p>
          </Tab>
          <Tab>
            <p>Public rooms</p>
          </Tab>
          <Tab>
            <p>Private rooms</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            {roomsList.map((room) => {
              return (<InfoCardComponent
                handleClick={onRoomClicked}
                key={room._id}
                id={room._id}
                data={generateToInfoCard(room)}/>);
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            {roomsList.map((room) => {
              return (room.isPublic && (<InfoCardComponent
                handleClick={onRoomClicked}
                key={room._id}
                id={room._id}
                data={generateToInfoCard(room)}/>));
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            {roomsList.map((room) => {
              return (!room.isPublic && (<InfoCardComponent
                handleClick={onRoomClicked}
                key={room._id}
                id={room._id}
                data={generateToInfoCard(room)}/>));
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
        popupModalSettings={popupModalSettings}/>
    </div>
  );
};

export default RoomsListPage;
