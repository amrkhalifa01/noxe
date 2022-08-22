import React, { useContext, useEffect } from "react";
import Styles from "./Home.module.scss";
import { Movie, Tvshow, Person } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import $ from "jquery";
import Images from "../../index";

export default function Home() {
  let { placeholders, isPeopleLoading, isTrendingTvShowsLoading, isTvShowsLoading, isTrendingLoading, isMoviesLoading, goToSearch, goToDetails, movies, setMovies, trendingMovies, setTrendingMovies, TvShows, setTvShows, trendingTvShows, setTrendingTvShows, people, setPeople, getItems, getTrending } = useContext(movieApiDataContext);

  $("#movies .button-type").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $("#movies .button-type").not(this).removeClass(`${Styles.active}`);
  });
  $("#movies .drop-button-type").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $("#movies .drop-button-type").not(this).removeClass(`${Styles.active}`);
  });
  $(".trendingMovies .button-time").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $(".trendingMovies .button-time").not(this).removeClass(`${Styles.active}`);
  });
  $(".trendingMovies .drop-button-time").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $(".trendingMovies .drop-button-time").not(this).removeClass(`${Styles.active}`);
  });
  $("#tvShows .button-type").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $("#tvShows .button-type").not(this).removeClass(`${Styles.active}`);
  });
  $("#tvShows .drop-button-type").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $("#tvShows .drop-button-type").not(this).removeClass(`${Styles.active}`);
  });
  $(".trandingTvShows .button-time").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $(".trandingTvShows .button-time").not(this).removeClass(`${Styles.active}`);
  });
  $(".trandingTvShows .drop-button-time").on("click", function () {
    $(this).addClass(`${Styles.active}`);
    $(".trandingTvShows .drop-button-time").not(this).removeClass(`${Styles.active}`);
  });

  useEffect(() => {
    getItems("movie", "now_playing", setMovies, 1);
    getItems("tv", "on_the_air", setTvShows, 1);
    getTrending("movie", "day", setTrendingMovies);
    getTrending("tv", "day", setTrendingTvShows);
    getItems("person", "popular", setPeople, 1);
  }, []);

  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>
      <div className="nav-height"></div>
      <div id="home">
        <div id={Styles.searchBox} className="mb-5 container-fluid container-lg px-0 shadow-sm">
          <div className={`py-5 px-md-5 px-4 ${Styles.searchOverLayer}`}>
            <div className="mb-5 text-white">
              <h1 className="mb-1">Welcome.</h1>
              <h2 className="fw-light">Millions of movies, TV shows and people to discover. Explore now.</h2>
            </div>
            <form onSubmit={goToSearch} className="mb-2 mb-md-5">
              <div className="position-relative">
                <input type="text" className="form-control rounded-5 ps-4 py-2" placeholder="movie, tv show, person......" name="search_text" required />
                <button className={`btn ${Styles.searchBtn} rounded-5 position-absolute top-0 end-0 border-0 h-100 px-4`}>Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <div id="movies" className="mb-5">
            <div className="d-flex mb-4 align-items-center">
              <h2 className="mb-0 me-3 h4 d-flex align-items-center">Movies</h2>
              <div className={`d-none d-md-block rounded-4 ${Styles.btnContainer}`}>
                <button
                  onClick={() => {
                    getItems("movie", "now_playing", setMovies, 1);
                  }}
                  className={`rounded-4 border-0 px-3 button-type ${Styles.active} `}>
                  Now Playing
                </button>
                <button
                  onClick={() => {
                    getItems("movie", "popular", setMovies, 1);
                  }}
                  className="rounded-4 border-0 px-3 button-type">
                  Popular
                </button>
                <button
                  onClick={() => {
                    getItems("movie", "top_rated", setMovies, 1);
                  }}
                  className="rounded-4 border-0 px-3 button-type">
                  Top Rated
                </button>
                <button
                  onClick={() => {
                    getItems("movie", "upcoming", setMovies, 1);
                  }}
                  className="rounded-4 border-0 px-3 button-type ">
                  Up Coming
                </button>
              </div>
              <div className="dropdown d-md-none">
                <button className={`btn dropdown-toggle shadow-none ${Styles.btnCategory}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item drop-button-type ${Styles.active}`}
                      onClick={() => {
                        getItems("movie", "now_playing", setMovies, 1);
                      }}>
                      Now Playing
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-type"
                      onClick={() => {
                        getItems("movie", "popular", setMovies, 1);
                      }}>
                      Popular
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-type"
                      onClick={() => {
                        getItems("movie", "top_rated", setMovies, 1);
                      }}>
                      Top Rated
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-type"
                      onClick={() => {
                        getItems("movie", "upcoming", setMovies, 1);
                      }}>
                      Up Coming
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row g-3 d-flex flex-nowrap scroll-bar position-relative">
              {isMoviesLoading
                ? placeholders.map((placeholder: number, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="placeholder-glow placeholder-container">
                          <div className="mb-4 img-container h-100">
                            <div className="placeholder w-100 h-100 rounded-2"></div>
                            <div className="home-rate-circle placeholder-wave border-0"></div>
                          </div>
                          <div className="placeholder mb-1 d-block placeholder-title"></div>
                          <div className="placeholder placeholder-date"></div>
                        </div>
                      </div>
                    );
                  })
                : movies.map((movie: Movie, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="card-container movie-item" onClick={() => goToDetails(movie.id, "movie")}>
                          <div className="mb-4 img-container">
                            <div className="rounded-2 overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt="movie poster"
                                onError={({ target }: any): void => {
                                  target.src = `${Images.imgNotFound}`;
                                }}
                                className="img-fluid"
                              />
                            </div>
                            <div className="home-rate-circle">{parseFloat(Number(movie.vote_average).toFixed(1))}</div>
                          </div>
                          <h3 className="h6 mb-1">{movie.title}</h3>
                          <h4 className="h6 text-muted sub-title">{movie.release_date}</h4>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div id={Styles.trendingMovies} className="mb-5 trendingMovies">
            <div className="d-flex mb-4 align-items-center">
              <h2 className="mb-0 me-3 h4 d-flex align-items-center">Trending Movies</h2>
              <div className={`d-none d-md-block rounded-4 ${Styles.btnContainer}`}>
                <button
                  onClick={() => {
                    getTrending("movie", "day", setTrendingMovies);
                  }}
                  className={`rounded-4 border-0 px-3 button-time ${Styles.active}`}>
                  Today
                </button>
                <button
                  onClick={() => {
                    getTrending("movie", "week", setTrendingMovies);
                  }}
                  className="rounded-4 border-0 px-3 button-time">
                  This Week
                </button>
              </div>
              <div className="dropdown d-md-none">
                <button className={`btn dropdown-toggle shadow-none ${Styles.btnCategory}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Time
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item drop-button-time ${Styles.active}`}
                      onClick={() => {
                        getTrending("movie", "day", setTrendingMovies);
                      }}>
                      Today
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-time"
                      onClick={() => {
                        getTrending("movie", "week", setTrendingMovies);
                      }}>
                      This Week
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row g-3 d-flex flex-nowrap scroll-bar position-relative">
              {isTrendingLoading
                ? placeholders.map((placeholder: number, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="placeholder-glow placeholder-container">
                          <div className="mb-4 img-container h-100">
                            <div className="placeholder w-100 h-100 rounded-2"></div>
                            <div className="home-rate-circle placeholder-wave border-0"></div>
                          </div>
                          <div className="placeholder mb-1 d-block placeholder-title"></div>
                          <div className="placeholder placeholder-date"></div>
                        </div>
                      </div>
                    );
                  })
                : trendingMovies.map((movie: Movie, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="card-container" onClick={() => goToDetails(movie.id, "movie")}>
                          <div className="mb-4 img-container">
                            <div className="rounded-2 overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt="movie poster"
                                onError={({ target }: any): void => {
                                  target.src = `${Images.imgNotFound}`;
                                }}
                                className="img-fluid"
                              />
                            </div>
                            <div className="home-rate-circle">{parseFloat(Number(movie.vote_average).toFixed(1))}</div>
                          </div>
                          <h3 className="h6 mb-1">{movie.title}</h3>
                          <h4 className="h6 text-muted sub-title">{movie.release_date}</h4>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div id="tvShows" className="mb-5">
            <div className="d-flex mb-4 align-items-center">
              <h2 className="mb-0 me-3 h4">Tv Shows</h2>
              <div className={`d-none d-md-block rounded-4 ${Styles.btnContainer}`}>
                <button
                  onClick={() => {
                    getItems("tv", "on_the_air", setTvShows, 1);
                  }}
                  className={`rounded-4 border-0 px-3 button-type ${Styles.active}`}>
                  Now Playing
                </button>
                <button
                  onClick={() => {
                    getItems("tv", "popular", setTvShows, 1);
                  }}
                  className="rounded-4 border-0 px-3 button-type">
                  Popular
                </button>
                <button
                  onClick={() => {
                    getItems("tv", "top_rated", setTvShows, 1);
                  }}
                  className="rounded-4 border-0 px-3 button-type">
                  Top Rated
                </button>
              </div>
              <div className="dropdown d-md-none">
                <button className={`btn dropdown-toggle shadow-none ${Styles.btnCategory}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item drop-button-type ${Styles.active}`}
                      onClick={() => {
                        getItems("tv", "on_the_air", setTvShows, 1);
                      }}>
                      Now Playing
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-type"
                      onClick={() => {
                        getItems("tv", "popular", setTvShows, 1);
                      }}>
                      Popular
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-type"
                      onClick={() => {
                        getItems("tv", "top_rated", setTvShows, 1);
                      }}>
                      Top Rated
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row g-3 d-flex flex-nowrap scroll-bar position-relative">
              {isTvShowsLoading
                ? placeholders.map((placeholder: number, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="placeholder-glow placeholder-container">
                          <div className="mb-4 img-container h-100">
                            <div className="placeholder w-100 h-100 rounded-2"></div>
                            <div className="home-rate-circle placeholder-wave border-0"></div>
                          </div>
                          <div className="placeholder mb-1 d-block placeholder-title"></div>
                          <div className="placeholder placeholder-date"></div>
                        </div>
                      </div>
                    );
                  })
                : TvShows.map((tvShow: Tvshow, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="card-container" onClick={() => goToDetails(tvShow.id, "tv")}>
                          <div className="mb-4 img-container">
                            <div className="rounded-2 overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                alt="tv show poster"
                                onError={({ target }: any): void => {
                                  target.src = `${Images.imgNotFound}`;
                                }}
                                className="img-fluid"
                              />
                            </div>
                            <div className="home-rate-circle">{parseFloat(Number(tvShow.vote_average).toFixed(1))}</div>
                          </div>
                          <h3 className="h6 mb-1">{tvShow.name}</h3>
                          <h4 className="h6 text-muted sub-title">{tvShow.first_air_date}</h4>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div id={Styles.trandingTvShows} className="mb-5 trandingTvShows">
            <div className="d-flex mb-4 align-items-center">
              <h2 className="mb-0 me-3 h4">Trending Tv Shows</h2>
              <div className={`d-none d-md-block rounded-4 ${Styles.btnContainer}`}>
                <button
                  onClick={() => {
                    getTrending("tv", "day", setTrendingTvShows);
                  }}
                  className={`rounded-4 border-0 px-3 button-time ${Styles.active}`}>
                  Today
                </button>
                <button
                  onClick={() => {
                    getTrending("tv", "week", setTrendingTvShows);
                  }}
                  className="rounded-4 border-0 px-3 button-time">
                  This Week
                </button>
              </div>
              <div className="dropdown d-md-none">
                <button className={`btn dropdown-toggle shadow-none ${Styles.btnCategory}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Time
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item drop-button-time ${Styles.active}`}
                      onClick={() => {
                        getTrending("tv", "day", setTrendingTvShows);
                      }}>
                      Today
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item drop-button-time"
                      onClick={() => {
                        getTrending("tv", "week", setTrendingTvShows);
                      }}>
                      This Week
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row g-3 d-flex flex-nowrap scroll-bar position-relative">
              {isTrendingTvShowsLoading
                ? placeholders.map((placeholder: number, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="placeholder-glow placeholder-container">
                          <div className="mb-4 img-container h-100">
                            <div className="placeholder w-100 h-100 rounded-2"></div>
                            <div className="home-rate-circle placeholder-wave border-0"></div>
                          </div>
                          <div className="placeholder mb-1 d-block placeholder-title"></div>
                          <div className="placeholder placeholder-date"></div>
                        </div>
                      </div>
                    );
                  })
                : trendingTvShows.map((tvShow: Tvshow, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="card-container" onClick={() => goToDetails(tvShow.id, "tv")}>
                          <div className="mb-4 img-container">
                            <div className="rounded-2 overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                alt="tv show poster"
                                onError={({ target }: any): void => {
                                  target.src = `${Images.imgNotFound}`;
                                }}
                                className="img-fluid"
                              />
                            </div>
                            <div className="home-rate-circle">{parseFloat(Number(tvShow.vote_average).toFixed(1))}</div>
                          </div>
                          <h3 className="h6 mb-1">{tvShow.name}</h3>
                          <h4 className="h6 text-muted sub-title">{tvShow.first_air_date}</h4>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div id="popularPeople" className="mb-5">
            <h2 className="mb-0 h4">Popular People</h2>
            <div className="row g-3 d-flex flex-nowrap align-items-center py-4 scroll-bar position-relative">
              {isPeopleLoading
                ? placeholders.map((placeholder: number, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="placeholder-glow placeholder-container">
                          <div className="mb-4 img-container h-100">
                            <div className="placeholder w-100 h-100 rounded-2"></div>
                            <div className="home-rate-circle placeholder-wave border-0"></div>
                          </div>
                          <div className="placeholder placeholder-date"></div>
                        </div>
                      </div>
                    );
                  })
                : people.map((person: Person, index: number) => {
                    return (
                      <div key={index} className="col">
                        <div className="card-container" onClick={() => goToDetails(person.id, "person")}>
                          <div className="rounded-2 overflow-hidden mb-2">
                            <img
                              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                              alt="person poster"
                              onError={({ target }: any): void => {
                                target.src = `${Images.imgNotFound}`;
                              }}
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="h6 mb-0">{person.name}</h3>
                          <h4 className="h6 text-muted fw-light sub-title">{person.known_for_department}</h4>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
