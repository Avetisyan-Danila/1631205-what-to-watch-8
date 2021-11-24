import {ThunkActionResult} from '../types/action';
import {loadFilms, requireAuthorization, requireLogout, redirectToRoute, loadFavoriteFilms, loadCertainFilm} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {Film} from '../types/film';
import {AuthData} from '../types/auth-data';
import {CommentData} from '../types/comment-data';
import {adapter} from '../film';
import {toast} from 'react-toastify';

const SERVER_FAIL_MESSAGE = 'Сервер не доступен';

export const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    const dataUIFormat: Film[] = [];

    data.map((film) => {
      dataUIFormat.push(adapter(film));
    });

    dispatch(loadFilms(dataUIFormat));
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
      toast.info(SERVER_FAIL_MESSAGE);
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
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const addCommentAction = ({id, rating, comment}: CommentData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const addFavoriteFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.FavoriteFilm}/${id}/1`);
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const removeFavoriteFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post(`${APIRoute.FavoriteFilm}/${id}/0`);
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const fetchFavoriteFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.FavoriteFilm);
      const dataUIFormat: Film[] = [];

      data.map((film) => {
        dataUIFormat.push(adapter(film));
      });

      dispatch(loadFavoriteFilms(dataUIFormat));
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const fetchCertainFilmAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const dataUIFormat: Film[] = [];
      dataUIFormat.push(adapter(data));

      dispatch(loadCertainFilm(dataUIFormat));
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
    } catch {
      toast.info(SERVER_FAIL_MESSAGE);
    }
  };
