import "./room-creation.page.scss";
import { Endpoints, States } from "../../../constants";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../../services/authentication.service";
import { useAuth0 } from "@auth0/auth0-react";
import GamePage from "../../game/game.page";
import TranslationService from "../../../services/translation.service";

const RoomCreationPage = () => {
  const translationService = new TranslationService();
  const authenticationService = new AuthenticationService();

  const [roomName, setRoomName] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState(true);
  const validationMessage = translationService.translate.roomCreationPage.validationInputsMessage;

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const navigationService = useNavigate();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleCreate = () => {
    if(!roomName || !categoryId || (!isPublic && !password)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    const room = {
      roomName: roomName,
      roomPassword: password ? password : null,
      categoryName: categories.find(category => category._id === categoryId)?.categoryName,
      remainingCards: categories.find(category => category._id === categoryId)?.deck,
      players: [],
      isWaiting: true,
      isGameOver: false,
      isPublic: isPublic,
      totalPoints: 0
    }
    authenticationService.post(Endpoints.Rooms, room)
      .then((result) => {
        if(result.data?.roomPassword) {
          navigationService(`${States.Game}/${result.data._id}/${result.data.roomPassword}`, { state: { GamePage } })
        }
        else {
          navigationService(`${States.Game}/${result.data._id}`, { state: { GamePage },replace: false })
        }
      })
  }

  const getAllCategories = () => {
    authenticationService
      .get(Endpoints.Category)
      .then((result) => {
        if(result.data) {
          setCategories(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, [null]);

  if (!isLoading && !isAuthenticated) loginWithRedirect();
  else {
    return (
      <div className="qcg-room-creation-page qcg-flex qcg-flex-center">
        <div className="wrapper">
          <div className="creation-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
            <h1 className="qcg-flex qcg-flex-center">{translationService.translate.roomCreationPage.roomCreationTitle}</h1>
            <div className="create-button qcg-flex">
              <Button
                variant="contained"
                endIcon={<ArrowBackIcon />}
                onClick={() => navigationService(States.RoomsList)}
              >
                {translationService.translate.roomCreationPage.backToPageButton}
              </Button>
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="roomNameInput"
                label={translationService.translate.roomCreationPage.roomNameInput}
                variant="standard"
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              <br />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  {translationService.translate.roomCreationPage.categorySelect}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryId}
                  onChange={handleChange}
                >
                  {categories.length !== 0 ? (
                    categories.map((e) => {
                      return <MenuItem value={e._id} key={e._id}>{e.categoryName}</MenuItem>;
                    })
                  ) : (
                    <div></div>
                  )}
                </Select>
              </FormControl>

              <div className="qcg-flex qcg-flex-center">
                <FormControl>
                  <FormLabel id="creation-page-radio-buttons-group-label">
                    {translationService.translate.roomCreationPage.roomStatus.statusTitle}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="creation-page-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <div className="qcg-flex qcg-flex-center">
                      <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label={translationService.translate.roomCreationPage.roomStatus.statusPublic}
                        checked={isPublic}
                        onChange={() => {
                          setIsPublic(true);
                        }}
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label={translationService.translate.roomCreationPage.roomStatus.statusPrivate}
                        checked={!isPublic}
                        onChange={() => {
                          setIsPublic(false);
                        }}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              {!isPublic ? (
                <TextField
                  type="password"
                  id="isPrivatePassword"
                  label={translationService.translate.roomCreationPage.roomStatus.privateStatusPasswordInput}
                  variant="standard"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              ) : (
                <></>
              )}
              <div className="create-button qcg-flex">
                <Button onClick={handleCreate} variant="contained" endIcon={<SendIcon />}>
                  {translationService.translate.roomCreationPage.createRoomButton}
                </Button>
              </div>
            </Box>
              <div hidden={isValid} className="validation">
                {validationMessage}
              </div>
          </div>
        </div>
      </div>
    );
  };
}

export default RoomCreationPage;
