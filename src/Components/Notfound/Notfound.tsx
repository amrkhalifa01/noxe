import React from "react";
import { useNavigate } from "react-router-dom";
import Images from "../..";

export default function Notfound() {
  let navigate = useNavigate();
  function goToHome() {
    navigate("home");
  }
  return (
    <>
      <div className="min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center justify-content-center text-dark-blue">
            <div className="col-md-6">
              <h1>
                Page Not Found <i className="fa-solid fa-face-frown d-inline-block d-md-none"></i>
              </h1>
              <h2 className="h5 fw-light mb-5">We couldn't find what you were looking for.</h2>
              <button className="btn btn-dark-blue w-100" onClick={goToHome}>
                Go back
              </button>
            </div>
            <div className="col-md-6">
              <div className="d-none d-md-block">
                <img src={Images.pageNotFound} className="img-fluid" alt="page not found" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
