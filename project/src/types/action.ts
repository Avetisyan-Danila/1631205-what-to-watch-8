import {Film} from './film';

export enum ActionType {
  ChangeGenre = 'changeGenreAction',
  GettingListFilms = 'gettingListFilms',
}

export type changeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string;
};

export type GettingListFilmsAction = {
  type: ActionType.GettingListFilms;
  payload: Film[],
};

export type Actions = changeGenreAction | GettingListFilmsAction;