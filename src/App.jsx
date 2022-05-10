import React, { useState } from 'react';
import './App.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import ProfilePage from './pages/profile/profile.page';
import RoomCreationPage from './pages/rooms/room-creation/room-creation.page';
import RoomsListPage from './pages/rooms/rooms-list/rooms-list.page';
import GamePage from './pages/game/game.page';
import { Endpoints, States } from './constants';
import NavbarComponent from "./components/navbar/navbar.component";
import AuthenticationService from './services/authentication.service';
import HttpHandlerService from './services/http-handler.service';
import TranslationService from './services/translation.service';
import LeaderBoardPage from './pages/leader-board/leader-board.page';
function App() {
    const authenticationService = new AuthenticationService();
    const translationService = new TranslationService();
    const httpHandlerService = new HttpHandlerService();
    const [name, setName] = useState("");
    const { isLoading, isAuthenticated, getIdTokenClaims, getAccessTokenSilently, logout, loginWithRedirect } = useAuth0();

    if (isAuthenticated) {

        setInterval(() => {
            getAccessTokenSilently().then((accessToken) => {
                localStorage.setItem("auth", accessToken);
            });
        }, 60000);

        getAccessTokenSilently().then((accessToken) => {
            localStorage.setItem("auth", accessToken);
            getIdTokenClaims().then((tokenClaims) => {
                if (tokenClaims) {
                    if (!authenticationService.getAuthenticationInfo()) {
                        authenticationService.storeAuthenticationInfo(tokenClaims, accessToken);
                        httpHandlerService.post(Endpoints.Users, authenticationService.authenticationInfo.userDetails)
                            .then((result) => {
                                authenticationService.updateUserDetails(result.data);
                                authenticationService.storeUserId(result.data._id);
                                setName(result.data.firstName);
                            })
                    }
                    else {
                        setName(authenticationService.getAuthenticationInfo().userDetails.firstName);
                    }
                }
            });
        });
    }
    return (
        <div className={`qcg-app qcg-flex qcg-flex-column ${translationService.translate.general.direction}`}>
            <BrowserRouter>
                {
                    !window.location.pathname.includes(States.Game) &&
                    <NavbarComponent name={name}></NavbarComponent>
                }
                <div className="routes">
                    <Routes>
                        <Route path={States.Main} element={<HomePage />} />
                        <Route path={States.Profile} element={<ProfilePage />} />
                        <Route path={States.LeaderBoard} element={<LeaderBoardPage />} />
                        <Route path={States.RoomCreation} element={<RoomCreationPage />} />
                        <Route path={States.RoomsList} element={<RoomsListPage />} />
                        <Route path={`${States.Game}/:id`} element={<GamePage />} />
                        <Route path={`${States.Game}/:id/:password`} element={<GamePage />} />

                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}


export default App;
