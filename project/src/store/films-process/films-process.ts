import {createReducer} from '@reduxjs/toolkit';
import {FilmsProcess} from '../../types/state';
import {changeGenre, gettingListFilms} from '../action';

const initialState: FilmsProcess = {
  genre: 'All genres',
  suitableFilms: [],
};

const filmsProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(gettingListFilms, (state, action) => {
      const {films} = action.payload;
      state.suitableFilms = films;
    });
});

export {filmsProcess};
