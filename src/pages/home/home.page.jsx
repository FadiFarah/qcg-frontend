import { Endpoints } from "../../constants";
import AuthenticationService from "../../services/authentication.service";
import HttpHandlerService from "../../services/http-handler.service";
import { useAuth0 } from '@auth0/auth0-react';
import "./home.page.scss";

const HomePage = () => {
    const authenticationService = new AuthenticationService();
    const httpHandlerService = new HttpHandlerService();
    const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
    getIdTokenClaims().then((token) => {
        if(token) {
            if(!authenticationService.getAuthenticationInfo()) {
                authenticationService.storeAuthenticationInfo(token);
                httpHandlerService.post(Endpoints.Users, authenticationService.authenticationInfo.userDetails)
                    .then((result) => {
                        authenticationService.storeUserId(result.data._id);
                    });
            }
        }
    });
    return (
        <div className="qcg-home-page">HomePage</div>
    );
};

export default HomePage;