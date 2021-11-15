import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';

const initialState = {
  genre: 'All genres',
  films: [],
  suitableFilms: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.GettingListFilms:
      return {...state, suitableFilms: action.payload};
    case ActionType.LoadFilms:
      return {...state, films: action.payload, suitableFilms: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
