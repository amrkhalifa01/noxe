import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authenticationContext, movieApiDataContext } from "../../Context/Store";
import styles from "./Navbar.module.scss";
import Images from "../../index";

export default function Navbar() {
  let { user, logout } = useContext(authenticationContext);
  let { goToSearch } = useContext(movieApiDataContext);
  return (
    <>
      <nav id={styles.nav} className="navbar navbar-expand-xl fixed-top shadow">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center " to="home">
            <img src={Images.navLogo} alt="Logo" />
          </Link>
          <button className={`navbar-toggler shadow-none border-0 ${styles.navToggle}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-align-right"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/*user ? () : (
              ""
            )*/}
              <>
                <ul className="navbar-nav me-auto mb-0">
                  <li className="nav-item">
                    <Link className={`nav-link ${styles.linkColor}`} to="home">
                      Home
                    </Link>
                  </li>
                  <li className={`nav-item dropdown ${styles.dropDownContainer}`}>
                    <Link to="movies" className={`nav-link dropdown-toggle ${styles.linkColor}`} data-bs-toggle="dropdown" aria-expanded="false">
                      Movies
                    </Link>
                    <ul className={`dropdown-menu py-3 ${styles.dropDownMenu}`}>
                      <li>
                        <Link className="dropdown-item" to="movies/popular">
                          Popular
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="movies/nowplaying">
                          Now Playing
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="movies/upcoming">
                          Upcoming
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="movies/toprated">
                          Top Rated
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className={`nav-item dropdown ${styles.dropDownContainer}`}>
                    <Link to="tvshows" className={`nav-link dropdown-toggle ${styles.linkColor}`} data-bs-toggle="dropdown" aria-expanded="false">
                      Tv Shows
                    </Link>
                    <ul className={`dropdown-menu py-3 ${styles.dropDownMenu}`}>
                      <li>
                        <Link className="dropdown-item" to="tvshows/nowplaying">
                          Now Playing
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="tvshows/popular">
                          Popular
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="tvshows/toprated">
                          Top Rated
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${styles.linkColor}`} to="people">
                      People
                    </Link>
                  </li>
                </ul>
                <form onSubmit={goToSearch} className="d-flex " role="search">
                  <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" required />
                  <button className={`btn border-0 px-0 ${styles.linkColor}`} type="submit">
                    <i className="fa-solid fa-magnifying-glass ms-1 "></i>
                  </button>
                </form>
              </>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item d-flex align-items-center justify-content-center px-2 order-last order-xl-first mx-2">
                <a href="https://www.facebook.com/" className={`mx-1 ${styles.linkColor}`}>
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://twitter.com/" className={`mx-1 ${styles.linkColor}`}>
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="https://instagram.com/" className={`mx-1 ${styles.linkColor}`}>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://open.spotify.com/" className={`mx-1 ${styles.linkColor}`}>
                  <i className="fa-brands fa-spotify"></i>
                </a>
              </li>
              
              {/*user ? (
                <>
                  <li className="nav-item ">
                    <Link onClick={() => logout()} className={`nav-link ${styles.linkColor}`} to="login">
                      {`${user.first_name} ${user.last_name}`}
                      <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${styles.linkColor}`} to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${styles.linkColor}`} to="signup">
                      Sign UP
                    </Link>
                  </li>
                </>
              )*/}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
