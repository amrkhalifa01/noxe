import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Styles from "./Search.module.scss";

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  let searchText: any = searchParams.get("query");

  return (
    <>
      <div className="nav-height"></div>
      <div className="container py-2 py-md-5 min-vh-100">
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-3">
              <div className={`card-header text-dark-blue fw-bold ${Styles.bgBlue}`}>Search Result</div>
              <div className="card-body p-0 py-2">
                <ul className="list-unstyled mb-0">
                  <li className={`px-3 py-2 ${Styles.searchLink}`}>
                    <Link to={`movie?query=${searchText}`} className="text-decoration-none">
                      Movies
                    </Link>
                  </li>
                  <li className={`px-3 py-2 ${Styles.searchLink}`}>
                    <Link to={`tvshows?query=${searchText}`} className="text-decoration-none">
                      Tv Shows
                    </Link>
                  </li>
                  <li className={`px-3 py-2 ${Styles.searchLink}`}>
                    <Link to={`people?query=${searchText}`} className="text-decoration-none">
                      People
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
