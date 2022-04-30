import { Endpoints, States } from "../../constants";
import AuthenticationService from "../../services/authentication.service";
import HttpHandlerService from "../../services/http-handler.service";
import { useAuth0 } from '@auth0/auth0-react';
import * as image from "../../assets/exports/images";
import { useNavigate } from "react-router-dom";
import "./home.page.scss";
import TranslationService from "../../services/translation.service";
import NewlineText from "../../components/newline-text/newline-text.component";

const HomePage = () => {
    const translationService = new TranslationService();
    const navigationService = useNavigate();
    return (
        <div className={`qcg-home-page qcg-flex qcg-flex-column ${translationService.translate.general.direction}`}>
            <div id="home" className="qcg-flex qcg-flex-center">
                <div className="home-wrapper qcg-flex qcg-flex-column">
                    <div className="header">
                        <h1>{translationService.translate.homePage.welcomeTitle}</h1>
                    </div>
                    <div className="body">
                        <NewlineText text={translationService.translate.homePage.welcomeDescription}></NewlineText>
                    </div>
                    <div className="footer qcg-flex qcg-flex-justify-content-end">
                        <img onClick={() => navigationService(States.RoomsList)} src={image.StartGameButton}></img>
                    </div>
                </div>
            </div>

            <div id="rules" className="qcg-flex">
                <div className="rules-wrapper qcg-flex qcg-flex-column full-width">
                    <div className="qcg-flex full-width qcg-flex-justify-center">
                        <h1 className="header">{translationService.translate.homePage.rulesTitle}</h1>
                    </div>
                    <div className="qcg-flex rules-content-wrapper">
                        <div className="image">
                            <img src={image.ChecklistEdited}></img>
                        </div>
                        <div className="rules qcg-flex qcg-flex-column qcg-flex-justify-center">
                            <NewlineText text={translationService.translate.homePage.rulesDescription}></NewlineText>
                        </div>
                    </div>
                </div>
            </div>

            <div id="about" className="qcg-flex">
                <div className="about-wrapper qcg-flex qcg-flex-column qcg-flex-center full-width">
                    <div className="about-image qcg-flex-justify-center">
                        <img src={image.AboutUsDone}></img>
                    </div>
                    <div className="about-content">
                        <NewlineText text={translationService.translate.homePage.aboutDescription}></NewlineText>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;