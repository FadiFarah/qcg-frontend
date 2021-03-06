import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "./theme/flex.scss";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = "https://www.qcg-api.com";
const root = createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        redirectUri={window.location.origin}
        >
        <App />
    </Auth0Provider>
);
