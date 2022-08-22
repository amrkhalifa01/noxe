import React, { useContext, useEffect } from "react";
import { Person } from "../../Context/Interface";
import { movieApiDataContext } from "../../Context/Store";
import Images from "../../index";

export default function People() {
  let { people, setPeople, getItems, goToDetails, nums, isLoading, setIsLoading } = useContext(movieApiDataContext);

  useEffect(() => {
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
      <div className="nav-height mb-4"></div>
      <div id="popularPeople" className="container mb-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-0 h3 align-self-start">Popular People</h2>
        <div className="py-4 row g-3 justify-content-center">
          {people.map((person: Person, index: number): any => {
            return (
              <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <div className="pointer" onClick={() => goToDetails(person.id, "person")}>
                  <div className="mb-2 rounded-2 overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt="movie poster"
                      onError={({ target }: any): any => {
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

        <nav>
          <ul className="pagination pagination-sm d-flex justify-content-center">
            {nums.map((num: number, index: number): any => {
              return (
                <li key={index} className="page-item">
                  <button className="page-link shadow-none text-dark-blue" onClick={() => getItems("person", "popular", setPeople, num)}>
                    {num}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
