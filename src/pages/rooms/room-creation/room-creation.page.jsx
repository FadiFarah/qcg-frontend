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
import * as signalR from "@microsoft/signalr";

const RoomCreationPage = () => {
  const authenticationService = new AuthenticationService();

  const [roomName, setRoomName] = useState();
  const [category, setCategory] = useState(" ");

  const [categories, setCategories] = useState([]);

  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState();

  const navigationService = useNavigate();

  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(Endpoints.SignalRRoomsListEndpointPrefix)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log(e);
  };

  const getAllCategories = () => {
    authenticationService
      .get(Endpoints.Category)
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    hubConnection.start().then(() => {
      console.log("connected");
      getAllCategories();

      hubConnection.on("All categories uploaded", () => {
        getAllCategories();
      });
    });
  }, []);

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
              id="standard-basic"
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
                value={category}
                onChange={handleChange}
                label="Category"
              >
                {categories.length !== 0 ? (
                  categories.map((e) => {
                    return <MenuItem value={e._id}>{e.categoryName}</MenuItem>;
                  })
                ) : (
                  <></>
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
                      onChange={() => {
                        setIsPublic(true);
                        console.log(isPublic);
                      }}
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label="Private"
                      onChange={() => {
                        setIsPublic(false);
                        console.log(isPublic);
                      }}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            {!isPublic ? (
              <TextField
                type="password"
                id="standard-basic"
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
              <Button variant="contained" endIcon={<SendIcon />}>
                Create
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RoomCreationPage;
