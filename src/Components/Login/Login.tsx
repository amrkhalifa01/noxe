import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User, Response, JoiResult, ErrorDetails } from "../../Context/Interface";
import { authenticationContext } from "../../Context/Store";

export default function Register() {
  let baseUrl: string = "https://routeegypt.herokuapp.com/";
  let navigate: any = useNavigate();
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [apiError, setApiError] = useState<string>("");
  let [joiErrorList, setJoiErrorList] = useState<ErrorDetails[]>([]);
  let { saveUserData }: any = useContext(authenticationContext);
  let [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  function getUserDate(e: React.ChangeEvent<HTMLInputElement>): void {
    let user: any = { ...userData };
    user[e.target.name] = e.target.value;
    setUserData(user);
  }

  async function sendUserData(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    let validateResult: JoiResult = validateLoginForm();
    setIsLoading(true);
    if (validateResult.error) {
      setJoiErrorList(validateResult.error.details);
      setIsLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "Something wrong, check your data",
      });
    } else {
      setJoiErrorList([]);
      let { data }: Response = await axios.post(`${baseUrl}signin`, userData);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        saveUserData();
        navigate("/home");
        setIsLoading(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      } else {
        setApiError(data.message);
        setIsLoading(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: "Something wrong, check your data",
        });
      }
    }
  }

  function validateLoginForm(): JoiResult {
    let scheme: any = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$")).message("Entre Valid Password - Minimum eight characters, at least one letter AND one number").required(),
    });
    return scheme.validate(userData, { abortEarly: false });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="nav-height"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 ">
              <div className="p-5 border rounded-4 bg-dark-blue shadow-lg">
                <h1 className="text-light mb-4 fw-light h2">Login form</h1>
                <form onSubmit={sendUserData}>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <label htmlFor="email" className="text-light mb-1 fw-light">
                        Email
                      </label>
                      <input onChange={getUserDate} id="email" type="email" placeholder="Enter Your Mail" name="email" className="form-control mb-2" />
                      {joiErrorList.map((error, index) => {
                        if (error.path[0] === "email") {
                          return (
                            <div key={index} className="alert alert-danger py-2 mb-0">
                              {error.message}
                            </div>
                          );
                        }
                        return "";
                      })}
                    </div>
                    <div className="col-12 mb-2">
                      <label htmlFor="password" className="text-light mb-1 fw-light">
                        Password
                      </label>
                      <input onChange={getUserDate} id="password" type="password" placeholder="Enter Your Password" name="password" className="form-control mb-2" />
                      {joiErrorList.map((error, index) => {
                        if (error.path[0] === "password") {
                          return (
                            <div key={index} className="alert alert-danger py-1 mb-0">
                              {error.message}
                            </div>
                          );
                        }
                        return "";
                      })}
                    </div>
                  </div>
                  {apiError ? <div className="alert alert-danger py-2">{apiError}</div> : ""}
                  <button type="submit" className={`btn btn-blue px-4 ${isLoading ? "disabled" : ""}`}>
                    Login {isLoading ? <i className="fa fa-spinner fa-spin"></i> : ""}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
