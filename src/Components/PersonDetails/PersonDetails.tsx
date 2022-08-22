import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Person, Movie, Tvshow, PersonSocialMedia } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import Images from "../../index";
import axios from "axios";

export default function PersonDetails() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [personDetails, setPersonDetails] = useState<Person>({});
  let { getDetails, goToDetails, isLoading, placeholders } = useContext(movieApiDataContext);
  let personId: any = searchParams.get("id");
  let [personMovies, setPersonMovies] = useState<Movie[]>([]);
  let [personTvShows, setPersonTvShows] = useState<Tvshow[]>([]);
  let [personSocialMedia, setPersonSocialMedia] = useState<PersonSocialMedia>({});

  async function getPersonWorks(mediaType: string, id: string, callBack: CallableFunction): Promise<void> {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/${mediaType}?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US`);
    callBack(data.cast);
  }

  async function getPersonSocialIcons(id: string): Promise<void> {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US`);
    setPersonSocialMedia(data);
  }

  useEffect(() => {
    getDetails("person", personId, setPersonDetails);
    getPersonWorks("movie_credits", personId, setPersonMovies);
    getPersonWorks("tv_credits", personId, setPersonTvShows);
    getPersonSocialIcons(personId);
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
      <div className="container-fluid px-0 min-vh-100 pt-3">
        <div className="container-fluid px-0 min-vh-100 d-flex align-items-center justify-content-center py-5 over-layer">
          <div className="container pt-5">
            <div className="row g-4 d-flex align-items-center">
              <div className="col-8 col-md-6 col-lg-4 m-auto">
                <div className="rounded-3 overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
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
                    <h2 className="h1 fw-bold">{personDetails.name}</h2>
                    <div className="d-flex">
                      <h3 className="h6 fw-bold me-2">Gender:</h3>
                      <h3 className="h6 fw-light me-2">{personDetails.gender === 1 ? "Female" : "Male"}.</h3>
                    </div>
                    <div className="d-flex">
                      <h3 className="h6 fw-bold me-2">Known For Department:</h3>
                      <h3 className="h6 fw-light me-2">{personDetails.known_for_department}.</h3>
                    </div>
                    {personDetails.place_of_birth ? (
                      <div className="d-flex">
                        <h3 className="h6 fw-bold me-2">Place Of Birth:</h3>
                        <h3 className="h6 fw-light me-2">{personDetails.place_of_birth}.</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {personDetails.birthday ? (
                      <div className="d-flex align-items-center">
                        <h3 className="h6 fw-bold me-2 mb-0">Birthday:</h3>
                        <h3 className="h6 fw-light mb-0">{personDetails.birthday}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex mb-4">
                    {personSocialMedia.instagram_id && personSocialMedia.instagram_id.length !== 0 ? (
                      <a href={`https://www.instagram.com/${personSocialMedia.instagram_id}/`} target="_blank" className="d-flex align-items-center justify-content-center text-decoration-none mx-1 social-link">
                        <i className="fa-brands fa-instagram fa-2x instagram-color"></i>
                      </a>
                    ) : (
                      ""
                    )}
                    {personSocialMedia.facebook_id && personSocialMedia.facebook_id.length !== 0 ? (
                      <a href={`https://www.facebook.com/${personSocialMedia.facebook_id}`} target="_blank" className="d-flex align-items-center justify-content-center text-decoration-none mx-1 social-link">
                        <i className="fa-brands fa-facebook fa-2x facebook-color"></i>
                      </a>
                    ) : (
                      ""
                    )}
                    {personSocialMedia.twitter_id && personSocialMedia.twitter_id.length ? (
                      <a href={`https://twitter.com/${personSocialMedia.twitter_id}`} target="_blank" className="d-flex align-items-center justify-content-center text-decoration-none mx-1 social-link">
                        <i className="fa-brands fa-twitter fa-2x twitter-color"></i>
                      </a>
                    ) : (
                      ""
                    )}
                    {personSocialMedia.imdb_id && personSocialMedia.imdb_id.length ? (
                      <a href={`https://www.imdb.com/name/${personSocialMedia.imdb_id}/`} target="_blank" className="d-flex align-items-center justify-content-center text-decoration-none mx-1 social-link">
                        <i className="fa-brands fa-imdb fa-2x imdb-color"></i>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  {personDetails.biography ? (
                    <div>
                      <h4 className="h5 mb-2 fw-bold">Biography</h4>
                      <p className="h6 mb-0 fw-light">{personDetails.biography}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {personMovies?.length !== 0 ? (
              <>
                <h3 className="h3 my-5 fw-bold text-light">
                  Known For These <span className="h6 fw-light">Movies</span>
                </h3>
                <div className="row g-3 flex-nowrap py-4 scroll-bar bg-dark-blue-op rounded-3 text-light">
                  {isLoading
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
                    : personMovies.map((movie: Movie, index: number): any => {
                        return (
                          <div key={index} className="col">
                            <div className="card-container m-auto" onClick={() => goToDetails(movie.id, "movie")}>
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
              </>
            ) : (
              ""
            )}
            {personTvShows?.length !== 0 ? (
              <>
                <h3 className="h3 my-5 fw-bold text-light">
                  Known For These <span className="h6 fw-light">Tv Shows</span>
                </h3>
                <div className="row g-3 flex-nowrap py-4 scroll-bar bg-dark-blue-op rounded-3 text-light">
                  {isLoading
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
                    : personTvShows.map((tvShow: Tvshow, index: number): any => {
                        return (
                          <div key={index} className="col">
                            <div className="card-container m-auto" onClick={() => goToDetails(tvShow.id, "tv")}>
                              <div className="mb-4 img-container">
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                    alt="movie poster"
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
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
