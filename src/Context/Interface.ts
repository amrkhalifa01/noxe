export interface User {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}
export interface Response {
  data: {
    message: string;
    token: string;
  };
}
export interface JoiResult {
  error: {
    details: ErrorDetails[];
  };
}
export interface ErrorDetails {
  message: string;
  path: string[];
}
export interface Props {
  children: React.ReactNode;
}
export interface Movie {
  id?: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: string;
  vote_count?: string;
  overview?: string;
  backdrop_path?: string;
  original_language?: "string";
  genres?: Genres[];
  production_companies?: ProductionCompanies[];
}
interface Genres {
  name?: string;
}
interface ProductionCompanies {
  logo_path?: string;
  name?: string;
}
export interface Tvshow {
  id?: number;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  original_language?: string;
  first_air_date?: string;
  vote_average?: string;
  vote_count?: string;
  overview?: string;
  genres?: Genres[];
  production_companies?: ProductionCompanies[];
  created_by?: TvCreatedBy[];
}
interface TvCreatedBy {
  profile_path?: string;
  name?: string;
  id?: number;
}
export interface Person {
  id?: number;
  name?: string;
  profile_path?: string;
  birthday?: string;
  place_of_birth?: string;
  gender?: number;
  known_for_department?: string;
  biography?: string;
}
export interface ImageCollection {
  navLogo: any;
  imgNotFound: any;
  companyLogo: any;
}
export interface PersonSocialMedia {
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  imdb_id?: string;
}
