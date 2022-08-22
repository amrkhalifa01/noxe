import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Movie } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import Images from "../../index";

export default function MovieDetails() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [movieDetails, setMovieDetails] = useState<Movie>({});
  let { getDetails, isLoading } = useContext(movieApiDataContext);
  let movieId: any = searchParams.get("id");

  useEffect(() => {
    getDetails("movie", movieId, setMovieDetails);
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
      <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className="container-fluid px-0 min-vh-100 pt-3">
        <div className="container-fluid px-0 min-vh-100 d-flex align-items-center justify-content-center py-5 over-layer">
          <div className="container pt-5">
            <div className="row g-4 d-flex align-items-center">
              <div className="col-8 col-md-6 col-lg-4 m-auto">
                <div className="rounded-3 overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    onError={({ target }: any): void => {
                      target.src = `${Images.imgNotFound}`;
                    }}
                    className="w-100"
                    alt="movie poster"
                  />
                </div>
              </div>
              <div className="col-lg-8 mt-3 mt-lg-0">
                <div className="text-light">
                  <div className="mb-4">
                    <h2 className="h1 fw-bold">{movieDetails.title}</h2>
                    {movieDetails.release_date?.length !== 0 ? (
                      <div className="d-flex">
                        <h3 className="h6 fw-bold me-2">Release Date:</h3>
                        <h3 className="h6 fw-light me-2">{movieDetails.release_date}.</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {movieDetails.genres?.length !== 0 ? (
                      <div className="d-flex align-items-center">
                        <h3 className="h6 fw-bold me-2">Genres:</h3>
                        <h3 className="h6 fw-light">
                          {movieDetails.genres
                            ? movieDetails.genres.map((genre): string => {
                                return `
                                ${genre.name}${movieDetails.genres?.indexOf(genre) === Number(movieDetails.genres?.length) - 1 ? "." : ","}`;
                              })
                            : ""}
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="d-flex">
                      <h3 className="h6 fw-bold me-2">Original Language:</h3>
                      <h3 className="h6 fw-light me-2">{movieDetails.original_language}.</h3>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-4 py-2">
                    <div className="details-rate-circle me-2">
                      <h4 className="h6 mb-0">
                        {parseFloat(Number(movieDetails.vote_average).toFixed(1)) * 10}
                        <sup>
                          <i className="fa-solid fa-percent fa-xs"></i>
                        </sup>
                      </h4>
                    </div>
                    <div>
                      <h4 className="h6 mb-0 fw-bold">Score</h4>
                      <h5 className="h6 mb-0 fw-light">Users count : {movieDetails.vote_count}</h5>
                    </div>
                  </div>
                  {movieDetails.overview?.length !== 0 ? (
                    <div className="mb-4">
                      <h4 className="h5 mb-2 fw-bold">Overview</h4>
                      <p className="h6 mb-0 fw-light">{movieDetails.overview}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {movieDetails.production_companies?.length !== 0 ? (
                    <>
                      <h3 className=" h5 fw-bold me-2 mb-3">Production Companies</h3>
                      <div className="p-4 bg-white rounded-2 text-dark-blue">
                        <div className="row g-4 d-flex justify-content-center align-items-center">
                          {movieDetails.production_companies &&
                            movieDetails.production_companies.map((company, index) => {
                              return (
                                <div key={index} className="col-lg-3">
                                  <div className="text-center">
                                    <img
                                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                      onError={({ target }: any) => {
                                        target.src = `${Images.companyLogo}`;
                                        target.className = `mb-2 rounded-5 company-logo`;
                                      }}
                                      className="mb-2 company-logo"
                                      alt="company logo"
                                    />
                                    <h4 className="h6 mb-0 me-1 fw-light">{company.name}</h4>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
