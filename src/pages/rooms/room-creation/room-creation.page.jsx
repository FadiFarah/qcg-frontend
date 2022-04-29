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

const RoomCreationPage = () => {
  const authenticationService = new AuthenticationService();

  const [roomName, setRoomName] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState(true);
  const validationMessage = "One of your inputs is missing!"

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
      isPublic: isPublic
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
            <h1 className="qcg-flex qcg-flex-center">Create Your Room</h1>
            <div className="create-button qcg-flex">
              <Button
                variant="contained"
                endIcon={<ArrowBackIcon />}
                onClick={() => navigationService(States.RoomsList)}
              >
                back to rooms list
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
                label="Room Name"
                variant="standard"
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              <br />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryId}
                  onChange={handleChange}
                  label="Category"
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
                    Status
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
                        label="public"
                        checked={isPublic}
                        onChange={() => {
                          setIsPublic(true);
                        }}
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
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
                  label="password"
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
                  Create
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
