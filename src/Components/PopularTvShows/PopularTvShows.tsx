import React, { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tvshow } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import Images from "../../index";

export default function PopularTvShows() {
  let { TvShows, setTvShows, getItems, goToDetails, nums, isLoading } = useContext(movieApiDataContext);

  useEffect(() => {
    getItems("tv", "popular", setTvShows, 1);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div id="popularTvShows" className="container mb-3 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-0 h3 align-self-start">Popular Tv Shows</h2>
            <div className="py-4 row min-vh-100 g-3 justify-content-center">
              {TvShows.map((tvShow: Tvshow, index: number) => {
                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2">
                    <div className="pointer" onClick={() => goToDetails(tvShow.id, "tv")}>
                      <div className="mb-4 img-container">
                        <div className="rounded-2 overflow-hidden img-dimensions">
                          <LazyLoadImage
                            effect="blur"
                            placeholderSrc={Images.imgNotFound}
                            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                            onError={({ target }: any) => {
                              target.src = `${Images.imgNotFound}`;
                            }}
                            alt="tv show poster"
                            className="img-fluid rounded-2"
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
        </>
      )}
      <nav className="mb-5">
        <ul className="pagination pagination-sm d-flex justify-content-center">
          {nums.map((num: number, index: number): any => {
            return (
              <li key={index} className="page-item">
                <button className="page-link shadow-none text-dark-blue" onClick={() => getItems("tv", "popular", setTvShows, num)}>
                  {num}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
