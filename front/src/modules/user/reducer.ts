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
} from './action';

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
  [LOG_IN_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoggingin = true;
      draft.loginError = '';
    }),
  [LOG_IN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoggingin = false;
      draft.me = action.payload.data;
    }),
  [LOG_IN_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoggingin = true;
      draft.me = null;
      draft.loginError = 'error';
    }),
  [SIGN_UP_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.isSigningup = true;
      draft.isSignedup = false;
      draft.signupError = '';
    }),
  [SIGN_UP_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.isSigningup = false;
      draft.isSignedup = true;
    }),
  [SIGN_UP_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.isSigningup = true;
      draft.isSignedup = false;
      draft.signupError = 'error';
    }),
});

export default user;
