import {Film} from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  genre: string,
  films: Film[],
  suitableFilms: Film[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};