import {ActionType, changeGenreAction, GettingListFilmsAction} from '../types/action';
import {Film} from '../types/film';

export const changeGenre = (genre: string): changeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const GettingListFilms = (films: Film[]): GettingListFilmsAction => ({
  type: ActionType.GettingListFilms,
  payload: films,
});