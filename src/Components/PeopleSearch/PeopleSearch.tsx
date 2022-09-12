import React, { useContext, useEffect } from "react";
import { Person } from "../../Context/Interface";
import Images from "../../index";
import { useSearchParams } from "react-router-dom";
import { movieApiDataContext } from "../../Context/Store";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PeopleSearch() {
  let [searchParams, setSearchParams] = useSearchParams();
  let { getSearchItems, peopleSearch, setPeopleSearch, goToDetails, nums, resPgesNum, isLoading } = useContext(movieApiDataContext);
  let searchText: any = searchParams.get("query");

  useEffect(() => {
    getSearchItems("person", searchText, setPeopleSearch, 1);
  }, []);

  useEffect(() => {
    getSearchItems("person", searchText, setPeopleSearch, 1);
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
      ) : !isLoading && peopleSearch.length === 0 ? (
        <div className="min-vh-100">
          <h2 className="h6 mt-4">There are no people that matched your search.</h2>
        </div>
      ) : (
        <div className="row g-3 justify-content-center min-vh-100">
          {peopleSearch.map((person: Person, index: number) => {
            return (
              <div key={index} className="col-6 col-lg-4 col-xl-3">
                <div className="pointer" onClick={() => goToDetails(person.id, "person")}>
                  <div className="mb-4 img-container">
                    <div className="rounded-2 overflow-hidden search-img-dimensions">
                      <LazyLoadImage
                        effect="blur"
                        placeholderSrc={Images.imgNotFound}
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        onError={({ target }: any): void => {
                          target.src = `${Images.imgNotFound}`;
                        }}
                        alt="person profile"
                        className="img-fluid rounded-2"
                      />
                    </div>
                  </div>
                  <h3 className="h6 mb-1">{person.name}</h3>
                  <h4 className="h6 text-muted sub-title">{person.known_for_department}</h4>
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
                  <button className="page-link shadow-none text-dark-blue" onClick={() => getSearchItems("person", searchText, setPeopleSearch, num)}>
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
