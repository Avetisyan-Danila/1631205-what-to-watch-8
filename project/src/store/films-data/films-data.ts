import {createReducer} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {loadFilms} from '../action';

const initialState: FilmsData = {
  films: [],
  isDataLoaded: false,
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      const {films} = action.payload;
      state.films = films;
      state.isDataLoaded = true;
    });
});

export {filmsData};