import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({
    payload: {
      genre,
    },
  }),
);

export const gettingListFilms = createAction(
  ActionType.GettingListFilms,
  (films: Film[]) => ({
    payload: {
      films,
    },
  }),
);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: Film[]) => ({
    payload: {
      films,
    },
  }),
);

export const loadFavoriteFilms = createAction(
  ActionType.LoadFavoriteFilms,
  (films: Film[]) => ({
    payload: {
      films,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: {
      authStatus,
    },
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: {
      url,
    },
  }),
);
