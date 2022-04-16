import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./navbar.component.scss";
import * as image from "../../assets/exports/images";
import { States } from "../../constants";
import { useNavigate } from "react-router-dom";
const NavbarComponent = (props) => {
  const navigationService = useNavigate();

  const handleClick = (event, state) => {
    if(window.location.pathname !== States.Main || state !== States.Main) {
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
                  <a className="nav-item" href="" onClick={(e) => handleClick(e, States.Profile)}>Profile</a>
                </div>
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
                <ion-fab-button onClick={(e) => handleClick(e, States.Profile)} color="light">
                  <ion-label>Profile</ion-label>
                </ion-fab-button>
              </ion-fab-list>
            </ion-fab>
        </div>
      
    </div>
  );
};

export default NavbarComponent;
