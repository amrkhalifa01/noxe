import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Movies from "./Components/Movies/Movies";
import MovieSearch from "./Components/MovieSearch/MovieSearch";
import Navbar from "./Components/Navbar/Navbar";
import Notfound from "./Components/Notfound/Notfound";
import NowPlayingMovies from "./Components/NowPlayingMovies/NowPlayingMovies";
import NowPlayingTvShows from "./Components/NowPlayingTvShows/NowPlayingTvShows";
import People from "./Components/People/People";
import PeopleSearch from "./Components/PeopleSearch/PeopleSearch";
import PersonDetails from "./Components/PersonDetails/PersonDetails";
import PopularMovies from "./Components/PopularMovies/PopularMovies";
import PopularTvShows from "./Components/PopularTvShows/PopularTvShows";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Search from "./Components/Search/Search";
import TopRatedMovies from "./Components/TopRatedMovies/TopRatedMovies";
import TopRatedTvShows from "./Components/TopRatedTvShows/TopRatedTvShows";
import TvDetails from "./Components/TvDetails/TvDetails";
import TvSearch from "./Components/TvSearch/TvSearch";
import Tvshows from "./Components/Tvshows/Tvshows";
import UpcomingMovies from "./Components/UpcomingMovies/UpcomingMovies";

function App() {
  return (
    <ScrollToTop>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          }></Route>
        {/*<Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Register></Register>}></Route>*/}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          }></Route>
        <Route
          path="movies"
          element={
            <ProtectedRoute>
              <Movies></Movies>
            </ProtectedRoute>
          }>
          <Route path="/movies" element={<PopularMovies></PopularMovies>}></Route>
          <Route path="popular" element={<PopularMovies></PopularMovies>}></Route>
          <Route path="nowplaying" element={<NowPlayingMovies></NowPlayingMovies>}></Route>
          <Route path="upcoming" element={<UpcomingMovies></UpcomingMovies>}></Route>
          <Route path="toprated" element={<TopRatedMovies></TopRatedMovies>}></Route>
        </Route>
        <Route
          path="tvshows"
          element={
            <ProtectedRoute>
              <Tvshows></Tvshows>
            </ProtectedRoute>
          }>
          <Route path="/tvshows" element={<NowPlayingTvShows></NowPlayingTvShows>}></Route>
          <Route path="nowplaying" element={<NowPlayingTvShows></NowPlayingTvShows>}></Route>
          <Route path="popular" element={<PopularTvShows></PopularTvShows>}></Route>
          <Route path="toprated" element={<TopRatedTvShows></TopRatedTvShows>}></Route>
        </Route>
        <Route
          path="people"
          element={
            <ProtectedRoute>
              <People></People>
            </ProtectedRoute>
          }></Route>
        <Route
          path="movie"
          element={
            <ProtectedRoute>
              <MovieDetails></MovieDetails>
            </ProtectedRoute>
          }></Route>
        <Route
          path="tv"
          element={
            <ProtectedRoute>
              <TvDetails></TvDetails>
            </ProtectedRoute>
          }></Route>
        <Route
          path="person"
          element={
            <ProtectedRoute>
              <PersonDetails></PersonDetails>
            </ProtectedRoute>
          }></Route>
        <Route
          path="search"
          element={
            <ProtectedRoute>
              <Search></Search>
            </ProtectedRoute>
          }>
          <Route path="/search" element={<MovieSearch></MovieSearch>}></Route>
          <Route path="/search/movie" element={<MovieSearch></MovieSearch>}></Route>
          <Route path="/search/tvshows" element={<TvSearch></TvSearch>}></Route>
          <Route path="/search/people" element={<PeopleSearch></PeopleSearch>}></Route>
        </Route>
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
      <Footer></Footer>
    </ScrollToTop>
  );
}

export default App;
