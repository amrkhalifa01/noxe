import React from "react";
import { Outlet } from "react-router-dom";

export default function Tvshows() {
  return (
    <>
      <div className="nav-height mb-4"></div>
      <div className="min-vh-100">
        <Outlet />
      </div>
    </>
  );
}
