import {Film} from './film';
import {RootState} from '../store/root-reducer';
import {AuthorizationStatus} from '../const';

export type FilmsData = {
  films: Film[],
  favoriteFilms: Film[],
  isDataLoaded: boolean,
};

export type FilmsProcess = {
  genre: string,
  suitableFilms: Film[],
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type State = RootState;
