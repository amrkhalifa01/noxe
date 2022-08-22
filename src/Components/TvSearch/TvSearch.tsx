import React, { useContext, useEffect } from "react";
import { Tvshow } from "../../Context/Interface";
import Images from "../../index";
import { useSearchParams } from "react-router-dom";
import { movieApiDataContext } from "../../Context/Store";

export default function TvSearch() {
  let [searchParams, setSearchParams] = useSearchParams();
  let { getSearchItems, tvShowSearch, setTvShowSearch, goToDetails, nums, resPgesNum, isLoading } = useContext(movieApiDataContext);
  let searchText: any = searchParams.get("query");

  useEffect(() => {
    getSearchItems("tv", searchText, setTvShowSearch, 1);
  }, []);

  useEffect(() => {
    getSearchItems("tv", searchText, setTvShowSearch, 1);
  }, [searchText]);

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
        ""
      )}
      {!isLoading && tvShowSearch.length === 0 ? (
        <h2 className="h6 mt-4">There are no tv shows that matched your search.</h2>
      ) : (
        <div className="row g-3 min-vh-100 justify-content-center">
          {tvShowSearch.map((tvShow: Tvshow, index: number) => {
            return (
              <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <div className="pointer" onClick={() => goToDetails(tvShow.id, "tv")}>
                  <div className="mb-4 img-container">
                    <div className="rounded-2 overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        onError={({ target }: any): void => {
                          target.src = `${Images.imgNotFound}`;
                        }}
                        alt="movie poster"
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
      )}
      {resPgesNum !== 1 ? (
        <nav className="mt-4">
          <ul className="pagination pagination-sm d-flex justify-content-center mb-0">
            {nums.map((num: number, index: number): any => {
              return (
                <li key={index} className="page-item">
                  <button className="page-link shadow-none text-dark-blue" onClick={() => getSearchItems("tv", searchText, setTvShowSearch, num)}>
                    {num}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}
