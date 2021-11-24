import {createReducer} from '@reduxjs/toolkit';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {requireAuthorization, requireLogout} from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      const {authStatus} = action.payload;
      state.authorizationStatus = authStatus;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userProcess};
