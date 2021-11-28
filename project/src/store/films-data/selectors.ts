import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Film} from '../../types/film';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].films;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.Data].favoriteFilms;
export const getCertainFilm = (state: State): Film[] => state[NameSpace.Data].certainFilm;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
