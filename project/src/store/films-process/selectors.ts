import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Film} from '../../types/film';

export const getSuitableFilms = (state: State): Film[] => state[NameSpace.Films].suitableFilms;
export const getGenre = (state: State): string => state[NameSpace.Films].genre;
