import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./navbar.component.scss";
import * as image from "../../assets/exports/images";
import { States } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationService from "../../services/authentication.service";
import TranslationService from "../../services/translation.service";
 
const NavbarComponent = (props) => {
  const navigationService = useNavigate();
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const translationService = new TranslationService();

  const handleClick = (event, state) => {
    if (window.location.pathname !== States.Main || state !== States.Main) {
      event.preventDefault();
      navigationService(state);
    }
  };

  return (
    <div className={`qcg-navbar qcg-flex ${translationService.translate.general.direction}`}>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>
            <div className="qcg-flex">
              <div className="qcg-flex qcg-flex-15">
                <img src={image.logo}></img>
              </div>
              <div className="nav-items-wrapper qcg-flex qcg-flex-auto qcg-flex-center">
                <a className="nav-item" href="#home" onClick={(e) => handleClick(e, States.Main)}>{translationService.translate.navbarComponent.home}</a>
                <a className="nav-item" href="#rules" onClick={(e) => handleClick(e, States.Main)}>{translationService.translate.navbarComponent.rules}</a>
                <a className="nav-item" href="#about" onClick={(e) => handleClick(e, States.Main)}>{translationService.translate.navbarComponent.about}</a>
                {
                  isAuthenticated &&
                  <a className="nav-item" href="" onClick={(e) => handleClick(e, States.Profile)}>{translationService.translate.navbarComponent.profile}</a>
                }

                {
                  isAuthenticated &&
                  <a className="nav-item" href="" onClick={(e) => handleClick(e, States.LeaderBoard)}>{translationService.translate.navbarComponent.leaderBoard}</a>
                }
              </div>
              {
                !isLoading &&
                <div className="auth-details qcg-flex qcg-flex-15 qcg-flex-align-center qcg-flex-justify-content-end">
                  {
                    !isAuthenticated ?
                      <a href="#" onClick={loginWithRedirect}>{translationService.translate.navbarComponent.loginUserName}</a>
                      :
                      props.name?.length > 0 &&
                      <span className="welcome-message">{translationService.translate.navbarComponent.welcomeUserName}, {props.name}!</span>
                  }
                </div>
              }
            </div>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div className="floating-button">
        <ion-fab horizontal={
                translationService.translate.general.direction === "qcg-ltr"
                  ? "end"
                  : "start"
              } vertical="top" slot="fixed">
          <ion-fab-button>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="bottom">
            <ion-fab-button href="#home" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>{translationService.translate.navbarComponent.home}</ion-label>
            </ion-fab-button>
            <ion-fab-button href="#rules" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>{translationService.translate.navbarComponent.rules}</ion-label>
            </ion-fab-button>
            <ion-fab-button href="#about" onClick={(e) => handleClick(e, States.Main)} color="light">
              <ion-label>{translationService.translate.navbarComponent.about}</ion-label>
            </ion-fab-button>
            {
              isAuthenticated ?
                <ion-fab-button onClick={(e) => handleClick(e, States.Profile)} color="light">
                  <ion-label>{translationService.translate.navbarComponent.profile}</ion-label>
                </ion-fab-button>
                :
                <ion-fab-button onClick={loginWithRedirect} color="primary">
                  <ion-label>{translationService.translate.navbarComponent.loginUserName}</ion-label>
                </ion-fab-button>
            }

            {
              isAuthenticated &&
               <ion-fab-button onClick={(e) => handleClick(e, States.LeaderBoard)} color="light">
                  <ion-label>{translationService.translate.navbarComponent.leaderBoard}</ion-label>
               </ion-fab-button>
            }

          </ion-fab-list>
        </ion-fab>
      </div>

    </div>
  );
};

export default NavbarComponent;
