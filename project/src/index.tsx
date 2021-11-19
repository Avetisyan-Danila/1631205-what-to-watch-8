import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {rootReducer} from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {fetchFilmAction, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {AuthorizationStatus} from './const';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmAction());

const FilmData = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        title = {FilmData.title}
        genre = {FilmData.genre}
        releaseDate = {FilmData.releaseDate}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
