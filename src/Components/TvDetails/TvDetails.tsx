import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tvshow } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import Images from "../../index";

export default function TvDetails() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [tvShowDetails, setTvShowDetails] = useState<Tvshow>({});
  let { getDetails, goToDetails, isLoading } = useContext(movieApiDataContext);
  let tvShowId: any = searchParams.get("id");

  useEffect(() => {
    getDetails("tv", tvShowId, setTvShowDetails);
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
      <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${tvShowDetails.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className="container-fluid px-0 min-vh-100 pt-3">
        <div className="container-fluid px-0 min-vh-100 d-flex align-items-center justify-content-center py-5 over-layer">
          <div className="container pt-5">
            <div className="row g-4 d-flex align-items-center">
              <div className="col-8 col-md-6 col-lg-4 m-auto">
                <div className="rounded-3 overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
                    onError={({ target }: any) => {
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
                    <h2 className="h1 fw-bold">{tvShowDetails.name}</h2>
                    <div className="d-flex">
                      <h3 className="h6 fw-bold me-2">Release Date:</h3>
                      <h3 className="h6 fw-light me-2">{tvShowDetails.first_air_date}.</h3>
                    </div>
                    <div className="d-flex align-items-center">
                      <h3 className="h6 fw-bold me-2">Genres:</h3>
                      <h3 className="h6 fw-light">
                        {tvShowDetails.genres
                          ? tvShowDetails.genres.map((genre): string => {
                              return `
                                ${genre.name}${tvShowDetails.genres?.indexOf(genre) === Number(tvShowDetails.genres?.length) - 1 ? "." : ","}`;
                            })
                          : ""}
                      </h3>
                    </div>
                    <div className="d-flex">
                      <h3 className="h6 fw-bold me-2">Original Language:</h3>
                      <h3 className="h6 fw-light me-2">{tvShowDetails.original_language}.</h3>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-4 py-2">
                    <div className="details-rate-circle me-2">
                      <h4 className="h6 mb-0">
                        {parseFloat(Number(tvShowDetails.vote_average).toFixed(1)) * 10}
                        <sup>
                          <i className="fa-solid fa-percent fa-xs"></i>
                        </sup>
                      </h4>
                    </div>
                    <div>
                      <h4 className="h6 mb-0 fw-bold">Score</h4>
                      <h5 className="h6 mb-0 fw-light">Users count : {tvShowDetails.vote_count}</h5>
                    </div>
                  </div>
                  {tvShowDetails.overview?.length !== 0 ? (
                    <div className="mb-4">
                      <h4 className="h5 mb-2 fw-bold">Overview</h4>
                      <p className="h6 mb-0 fw-light">{tvShowDetails.overview}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {tvShowDetails.production_companies?.length !== 0 ? (
                    <>
                      <h3 className=" h5 fw-bold me-2 mb-3">Production Companies</h3>
                      <div className="p-4 bg-white rounded-2 text-dark-blue">
                        <div className="row g-4 d-flex justify-content-center align-items-center">
                          {tvShowDetails.production_companies &&
                            tvShowDetails.production_companies.map((company, index): any => {
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
            {tvShowDetails.created_by?.length === 0 ? "" : <h2 className="mt-5 mb-4 h3 text-light text-center">Created By:</h2>}
            <div className="row justify-content-center">
              {tvShowDetails.created_by?.map((person, index): any => {
                return (
                  <div key={index} className="col-8 col-md-6 col-lg-3 ">
                    <div className="pointer" onClick={() => goToDetails(person.id, "person")}>
                      <div className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                          onError={({ target }: any) => {
                            target.src = `${Images.imgNotFound}`;
                            target.className = "img-fluid rounded-2 mb-2";
                          }}
                          className="img-fluid rounded-2 mb-2"
                          alt="person profile image"
                        />
                        <h3 className="h6 text-light">{person.name}</h3>
                      </div>
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
