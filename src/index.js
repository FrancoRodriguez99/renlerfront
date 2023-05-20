import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="1002078848858-270kialc8tl7rptofdjv46u2rr52acdi.apps.googleusercontent.com">
      <React.StrictMode>
        <BrowserRouter>
          <App />
          <NotificationContainer />
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
