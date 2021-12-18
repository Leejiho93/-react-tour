import { createReducer } from 'typesafe-actions';
import { UserState, UserAction } from './type';
import produce from 'immer';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_RESET,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from './action';

export type IUserReducerState = typeof initialState;

const initialState: UserState = {
  isLoggingin: false,
  isLoggingout: false,
  loginError: '',
  isSignedup: false,
  isSigningup: false,
  signupError: '',
  me: null,
};

const user = createReducer<UserState, UserAction>(initialState, {
  [SIGN_UP_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.isSigningup = true;
      draft.isSignedup = false;
      draft.signupError = '';
    }),
  [SIGN_UP_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.isSigningup = false;
      draft.isSignedup = true;
    }),
  [SIGN_UP_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.isSigningup = false;
      draft.isSignedup = false;
      draft.signupError = action.payload;
    }),
  [SIGN_UP_RESET]: (state) =>
    produce(state, (draft) => {
      draft.isSignedup = false;
    }),
  [LOG_IN_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.isLoggingin = true;
      draft.loginError = '';
      draft.me = null;
    }),
  [LOG_IN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoggingin = false;
      draft.me = action.payload;
    }),
  [LOG_IN_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoggingin = false;
      draft.me = null;
      draft.loginError = action.payload;
    }),
  [LOG_OUT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.isLoggingout = true;
    }),
  [LOG_OUT_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.me = null;
      draft.isLoggingout = false;
    }),
  [LOG_OUT_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.isLoggingout = false;
    }),
  [LOAD_USER_REQUEST]: (state) =>
    produce(state, (draft) => {
      //
    }),
  [LOAD_USER_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.me = action.payload;
    }),
  [LOAD_USER_FAILURE]: (state) =>
    produce(state, (draft) => {
      //
    }),
});

export default user;
