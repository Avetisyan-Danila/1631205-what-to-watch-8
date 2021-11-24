import {createReducer} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {loadFilms, loadFavoriteFilms, loadCertainFilm} from '../action';

const initialState: FilmsData = {
  films: [],
  favoriteFilms: [],
  certainFilm: [],
  isDataLoaded: false,
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      const {films} = action.payload;
      state.films = films;
      state.isDataLoaded = true;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      const {films} = action.payload;
      state.favoriteFilms = films;
    })
    .addCase(loadCertainFilm, (state, action) => {
      const {film} = action.payload;
      state.certainFilm = film;
    });
});

export {filmsData};