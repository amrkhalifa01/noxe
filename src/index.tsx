import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.all.min.js";
import "jquery/dist/jquery.min.js";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import Store from "./Context/Store";
import { ImageCollection } from "./Context/Interface";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Store>
        <App />
      </Store>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const Images: ImageCollection = {
  navLogo: require("./images/logo-dark.webp"),
  imgNotFound: require("./images/notFound.jpg"),
  companyLogo: require("./images/companyNotFound.jpg"),
};
export default Images;
