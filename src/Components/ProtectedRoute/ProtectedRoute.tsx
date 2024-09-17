import React from "react";
import { Navigate } from "react-router-dom";
import { Props } from "../../Context/Interface";

export default function ProtectedRoute({ children }: Props): any {
  /*if (localStorage.getItem("token") === null) {
    return <Navigate to={"/login"} />;
  } else {}*/
    return children;
}
