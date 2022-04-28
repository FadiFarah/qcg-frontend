import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./navbar.component.scss";
import * as image from "../../assets/exports/images";
import { States } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationService from "../../services/authentication.service";
const NavbarComponent = (props) => {
  const navigationService = useNavigate();
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const authenticationServie = new AuthenticationService();

  const handleClick = (event, state) => {
    if (window.location.pathname !== States.Main || state !== States.Main) {
      event.preventDefault();
      navigationService(state);
    }
  };

  return (
    <div className="qcg-navbar qcg-flex">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>
            <div className="qcg-flex">
              <div className="qcg-flex qcg-flex-30">
                <img src={image.logo}></img>
              </div>
              <div className="nav-items-wrapper qcg-flex qcg-flex-40 qcg-flex-center qcg-flex-justify-space-evenly">
                <a className="nav-item" href="#home" onClick={(e) => handleClick(e, States.Main)}>Home</a>
                <a className="nav-item" href="#rules" onClick={(e) => handleClick(e, States.Main)}>Rules</a>
                <a className="nav-item" href="#about" onClick={(e) => handleClick(e, States.Main)}>About</a>
                {
                  isAuthenticated &&
                  <a className="nav-item" href="" onClick={(e) => handleClick(e, States.Profile)}>Profile</a>
                }
              </div>
              {
                !isLoading &&
                <div className="auth-details qcg-flex qcg-flex-auto qcg-flex-align-center qcg-flex-justify-content-end">
                  {
                    !isAuthenticated ?
                      <a href="#" onClick={loginWithRedirect}>Login</a>
                      :
                      props.name?.length > 0 &&
                      <span className="welcome-message">Welcome, {props.name}!</span>
                  }
                </div>
              }
            </div>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div className="floating-button">
        <ion-fab horizontal="end" vertical="top" slot="fixed">
          <ion-fab-button>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="bottom">
            <ion-fab-button href="#home" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>Home</ion-label>
            </ion-fab-button>
            <ion-fab-button href="#rules" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>Rules</ion-label>
            </ion-fab-button>
            <ion-fab-button href="#about" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>About</ion-label>
            </ion-fab-button>
            {
              isAuthenticated ?
                <ion-fab-button onClick={(e) => handleClick(e, States.Profile)} color="light">
                  <ion-label>Profile</ion-label>
                </ion-fab-button>
                :
                <ion-fab-button onClick={loginWithRedirect} color="primary">
                  <ion-label>Login</ion-label>
                </ion-fab-button>
            }
          </ion-fab-list>
        </ion-fab>
      </div>

    </div>
  );
};

export default NavbarComponent;
