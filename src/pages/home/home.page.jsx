import { Endpoints, States } from "../../constants";
import AuthenticationService from "../../services/authentication.service";
import HttpHandlerService from "../../services/http-handler.service";
import { useAuth0 } from '@auth0/auth0-react';
import * as image from "../../assets/exports/images";
import { useNavigate } from "react-router-dom";
import "./home.page.scss";

const HomePage = () => {
    const authenticationService = new AuthenticationService();
    const httpHandlerService = new HttpHandlerService();
    const navigationService = useNavigate();
    const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
    getAccessTokenSilently().then((accessToken) => {
        getIdTokenClaims().then((tokenClaims) => {
            if(tokenClaims) {
                if(!authenticationService.getAuthenticationInfo()) {
                    authenticationService.storeAuthenticationInfo(tokenClaims, accessToken);
                    httpHandlerService.post(Endpoints.Users, authenticationService.authenticationInfo.userDetails)
                        .then((result) => {
                            authenticationService.storeUserId(result.data._id);
                        });
                    }
                }
        });
    });
    return (
        <div className="qcg-home-page qcg-flex qcg-flex-column">
            <div id="home" className="qcg-flex qcg-flex-center">
                <div className="home-wrapper qcg-flex qcg-flex-column">
                    <div className="header">
                        <h1>welcome to Our QUARTETT game!</h1>
                    </div>
                    <div className="body">
                        <p>You might know this famous game and maybe played with your family, our interactive game is the same and you can play with up to 4 people.</p>
                        <p>Our company specifies in online card games and our goal is to give you the best experience online which will be very smiliar (and maybe better) than reality.</p>
                        <h6 className="sub-title">Ok, Lets Start!</h6>
                        <p>Before you create a new game, you have to sign up/log in,find a free table and wait for the other players to log in. It might take a while so be patient.</p>
                        <p>If you forgot the rules, or if its your first time playing, that's ok. You can always navigate to the Rules page by clicking The 'RULES' button on the of the screen.</p>
                        <p className="sub-title">So have fun and lets hope you will be the winner of your table!</p>
                    </div>
                    <div className="footer qcg-flex qcg-flex-justify-content-end">
                        <img onClick={() => navigationService(States.RoomsList)} src={image.StartGameButton}></img>
                    </div>
                </div>
            </div>

            <div id="rules" className="qcg-flex">
                <div className="rules-wrapper qcg-flex qcg-flex-column full-width">
                    <div className="qcg-flex full-width qcg-flex-justify-center">
                        <h1 className="header">RULES</h1>
                    </div>
                    <div className="qcg-flex rules-content-wrapper">
                        <div className="image">
                            <img src={image.ChecklistEdited}></img>
                        </div>
                        <div className="rules">
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>-Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
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
                        <p>We are a team of four developers who are passionate about Creating web games.
                            Our company specifies in online card games and our goal is to give you the best experience online
                            which will be very similar (and maybe better) to reality.
                        </p>
                        <p>
                            The idea behind our company is to connect people by playing the good old games with their friends.
                            The Quartet game is our favorite one and we want to give our players the best experience
                            that will be the closest to sitting with your friends.
                        </p>
                        <p>
                            In the future, we would like you guys to ask us for specific games that we would love to re-create online for you.
                        </p>
                        <p>
                            We believe that games connect people and it's a great excuse to spend time with others in a very busy world.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;