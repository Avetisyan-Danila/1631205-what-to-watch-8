import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

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
    />
  </React.StrictMode>,
  document.getElementById('root'));
