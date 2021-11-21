import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  ChangeGenre = 'films/changeGenreAction',
  GettingListFilms = 'films/gettingListFilms',
  LoadFilms = 'data/loadFilms',
  LoadFavoriteFilms = 'data/loadFavoriteFilms',
  RequireAuthorization = 'user/RequireAuthorization',
  RequireLogout = 'user/RequireLogout',
  RedirectToRoute = 'films/RedirectToRoute',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;