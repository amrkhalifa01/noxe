import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Props, User, Movie, Tvshow, Person, MovieVideo } from "./Interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export let authenticationContext = createContext<any>(0);
export let movieApiDataContext = createContext<any>(0);

export default function Store({ children }: Props) {
  let [user, setUser] = useState<any>(null);
  let [movies, setMovies] = useState<Movie[]>([]);
  let [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  let [TvShows, setTvShows] = useState<Tvshow[]>([]);
  let [trendingTvShows, setTrendingTvShows] = useState<Tvshow[]>([]);
  let [people, setPeople] = useState<Person[]>([]);
  let [movieSearch, setMovieSearch] = useState<Movie[]>([]);
  let [tvShowSearch, setTvShowSearch] = useState<Tvshow[]>([]);
  let [peopleSearch, setPeopleSearch] = useState<Person[]>([]);
  let [resPgesNum, setResPgesNum] = useState<number>(0);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [isMoviesLoading, setIsMoviesLoading] = useState<boolean>(true);
  let [isTvShowsLoading, setIsTvShowsLoading] = useState<boolean>(true);
  let [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(true);
  let [isTrendingLoading, setIsTrendingLoading] = useState<boolean>(true);
  let [isTrendingTvShowsLoading, setIsTrendingTvShowsLoading] = useState<boolean>(true);
  let [trailerKey, setTrailerKey] = useState<MovieVideo>({});
  let navigate = useNavigate();
  let nums = new Array(resPgesNum).fill(1).map((element, index) => index + 1);
  let placeholders = new Array(20).fill(1).map((element, index) => index + 1);

  async function getItems(mediaType: string, query: string, callBack: CallableFunction, pageNum: number): Promise<void> {
    setIsLoading(true);
    if (mediaType === "movie") {
      setIsMoviesLoading(true);
    }
    if (mediaType === "tv") {
      setIsTvShowsLoading(true);
    }
    if (mediaType === "person") {
      setIsPeopleLoading(true);
    }
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${query}?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=${pageNum}`);
    callBack(data.results);
    setResPgesNum(Math.min(Math.max(parseInt(data.total_pages), 1), 15));
    setIsLoading(false);
    if (mediaType === "movie") {
      setIsMoviesLoading(false);
    }
    if (mediaType === "tv") {
      setIsTvShowsLoading(false);
    }
    if (mediaType === "person") {
      setIsPeopleLoading(false);
    }
  }

  async function getTrending(mediaType: string, timeWindow: string, callBack: CallableFunction): Promise<void> {
    setIsLoading(true);
    if (mediaType === "movie") {
      setIsTrendingLoading(true);
    }
    if (mediaType === "tv") {
      setIsTrendingTvShowsLoading(true);
    }
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=1`);
    callBack(data.results);
    setResPgesNum(Math.min(Math.max(parseInt(data.total_pages), 1), 15));
    setIsLoading(false);
    if (mediaType === "movie") {
      setIsTrendingLoading(false);
    }
    if (mediaType === "tv") {
      setIsTrendingTvShowsLoading(false);
    }
  }

  async function getDetails(mediaType: string, id: string, callBack: CallableFunction): Promise<void> {
    setIsLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US`);
    callBack(data);
    setIsLoading(false);
  }

  async function getSearchItems(mediaType: string, query: string, callBack: CallableFunction, pageNum: number): Promise<void> {
    setIsLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}?api_key=961415d22bc62f337bb599ca45cf0653&query=${query}&language=en-US&page=${pageNum}&include_adult=false`);
    callBack(data.results);
    setResPgesNum(Math.min(Math.max(parseInt(data.total_pages), 1), 15));
    setIsLoading(false);
  }

  async function getItemsKeys(mediaType: string, itemId: string) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${itemId}/videos?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US`);
    getTrailerKey(data.results);
  }

  function getTrailerKey(keys: MovieVideo[]) {
    keys.filter((key) => {
      if (key.type === "Trailer" || key.name === "Official Trailer") {
        return setTrailerKey(key);
      } else {
        return "";
      }
    });
  }

  function saveUserData(): void {
    let encodedToken: any = localStorage.getItem("token");
    let decodedToken: User = jwtDecode(encodedToken);
    setUser(decodedToken);
  }

  function logout(): void {
    setUser(null);
    localStorage.removeItem("token");
  }

  function goToDetails(id: number, path: string): void {
    navigate({
      pathname: `/${path}`,
      search: `?id=${id}`,
    });
  }

  function goToSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let searchText: any = e.currentTarget[0];
    navigate({
      pathname: "/search",
      search: `?query=${searchText.value.toLowerCase()}`,
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  return (
    <authenticationContext.Provider value={{ saveUserData, user, logout }}>
      <movieApiDataContext.Provider
        value={{ trailerKey, getItemsKeys, placeholders, isPeopleLoading, isTrendingTvShowsLoading, isTvShowsLoading, isTrendingLoading, isMoviesLoading, isLoading, setIsLoading, nums, resPgesNum, tvShowSearch, setTvShowSearch, peopleSearch, setPeopleSearch, getSearchItems, movieSearch, setMovieSearch, goToDetails, goToSearch, getDetails, movies, setMovies, trendingMovies, setTrendingMovies, TvShows, setTvShows, trendingTvShows, setTrendingTvShows, people, setPeople, getItems, getTrending }}>
        {children}
      </movieApiDataContext.Provider>
    </authenticationContext.Provider>
  );
}
