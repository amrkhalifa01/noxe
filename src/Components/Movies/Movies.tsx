import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

export default function Movies() {
  return (
    <>
      <div className="nav-height mb-4"></div>
      <Outlet />
    </>
  );
}
