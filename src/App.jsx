import React from 'react';
import './App.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import ProfilePage from './pages/profile/profile.page';
import RoomCreationPage from './pages/rooms/room-creation/room-creation.page';
import RoomWaitPage from './pages/rooms/room-wait/room-wait.page';
import RoomsListPage from './pages/rooms/rooms-list/rooms-list.page';
import HelpPage from './pages/help/help.page';
import GamePage from './pages/game/game.page';
import { States } from './constants';
import NavbarComponent from "./components/navbar/navbar.component";
function App() {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    if (isLoading) return <div>Loading...</div>

    if(!isAuthenticated){
        loginWithRedirect();
    }
    else {
        return (
            <div>
                <div className="qcg-flex qcg-flex-column">
                    <BrowserRouter>
                    {
                        window.location.pathname !== States.Game &&
                        <NavbarComponent></NavbarComponent>
                    }
                        <Routes>
                            <Route path={States.Main} element={<HomePage />} />
                            <Route path={States.Profile} element={<ProfilePage />} />
                            <Route path={States.RoomCreation} element={<RoomCreationPage />} />
                            <Route path={States.RoomWait} element={<RoomWaitPage />} />
                            <Route path={States.RoomsList} element={<RoomsListPage />} />
                            <Route path={States.Game} element={<GamePage />} />
                            <Route path={States.Help} element={<HelpPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
