import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {films} from '../mocks/films';

const initialState = {
  genre: 'All genres',
  films,
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.GettingListFilms:
      return {...state, films: action.payload};
    default:
      return state;
  }
};

export {reducer};
