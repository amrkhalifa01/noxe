import React from "react";
import Styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <footer className={`d-flex align-items-center justify-content-center p-3 ${Styles.footer}`}>
      <h2 className="mb-0 h6">
        <i className="fa-solid fa-copyright me-2"></i>
        2022 AAK, Inc. All rights reserved.
      </h2>
    </footer>
  );
}
