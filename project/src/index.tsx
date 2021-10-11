import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';

const FilmData = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      title = {FilmData.title}
      genre = {FilmData.genre}
      releaseDate = {FilmData.releaseDate}
      films = {films}
    />
  </React.StrictMode>,
  document.getElementById('root'));
