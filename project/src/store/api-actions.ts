import {ThunkActionResult} from '../types/action';
import {loadFilms, requireAuthorization, requireLogout, redirectToRoute, loadFavoriteFilms, loadCertainFilm} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute, UserInformation} from '../const';
import {Film} from '../types/film';
import {AuthData} from '../types/auth-data';
import {CommentData} from '../types/comment-data';
import {adapter} from '../film';
import {toast} from 'react-toastify';

export const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    const adaptedFilms: Film[] = [];

    data.map((film) => {
      adaptedFilms.push(adapter(film));
    });

    dispatch(loadFilms(adaptedFilms));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login)
        .then(({data}) => {
          if (!data) {
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          } else {
            dispatch(requireAuthorization(AuthorizationStatus.Auth));
          }
        });
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const addCommentAction = ({id, rating, comment}: CommentData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const addFavoriteFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.FavoriteFilm}/${id}/1`);
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const removeFavoriteFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.FavoriteFilm}/${id}/0`);
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const fetchFavoriteFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.FavoriteFilm);
      const adaptedFilms: Film[] = [];

      data.map((film) => {
        adaptedFilms.push(adapter(film));
      });

      dispatch(loadFavoriteFilms(adaptedFilms));
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const fetchCertainFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const adaptedFilms: Film[] = [];
      adaptedFilms.push(adapter(data));

      dispatch(loadCertainFilm(adaptedFilms));
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
    } catch {
      toast.error(UserInformation.ServerFailMessage);
    }
  };
