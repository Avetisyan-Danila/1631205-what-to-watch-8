import {ActionType, changeGenreAction, GettingListFilmsAction, LoadFilmsAction, RequireAuthorizationAction, RequireLogoutAction, RedirectToRouteAction} from '../types/action';
import {Film} from '../types/film';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeGenre = (genre: string): changeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const GettingListFilms = (films: Film[]): GettingListFilmsAction => ({
  type: ActionType.GettingListFilms,
  payload: films,
});

export const loadFilms = (films: Film[]): LoadFilmsAction => ({
  type: ActionType.LoadFilms,
  payload: films,
});

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});

export const redirectToRoute = (url: AppRoute): RedirectToRouteAction => ({
  type: ActionType.RedirectToRoute,
  payload: url,
});
