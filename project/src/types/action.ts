import {Film} from './film';
import {AuthorizationStatus} from '../const';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  ChangeGenre = 'films/changeGenreAction',
  GettingListFilms = 'films/gettingListFilms',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/RequireAuthorization',
  RequireLogout = 'user/RequireLogout',
  RedirectToRoute = 'films/RedirectToRoute',
}

export type changeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string;
};

export type GettingListFilmsAction = {
  type: ActionType.GettingListFilms;
  payload: Film[],
};

export type LoadFilmsAction = {
  type: ActionType.LoadFilms;
  payload: Film[],
};

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization,
  payload: AuthorizationStatus,
};

export type RequireLogoutAction = {
  type: ActionType.RequireLogout,
};

export type RedirectToRouteAction = {
  type: ActionType.RedirectToRoute,
  payload: string,
};

export type Actions = changeGenreAction | GettingListFilmsAction | LoadFilmsAction | RequireAuthorizationAction | RequireLogoutAction| RedirectToRouteAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;