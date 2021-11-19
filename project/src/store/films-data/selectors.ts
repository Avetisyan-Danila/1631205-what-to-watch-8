import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Film} from '../../types/film';

export const getFilms = (state: State): Film[] => state[NameSpace.data].films;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
