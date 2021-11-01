import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import user from './user';
import userSaga from './user/saga';

axios.defaults.baseURL = `http://localhost:8081/api`;

const rootReducer = combineReducers({
  // index: (state: Record<string, unknown> = {}, action) => {
  //   switch (action.type) {
  //     case HYDRATE:
  //       return {
  //         ...state,
  //         ...action.payload,
  //       };
  //   }
  // },
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([call(userSaga)]);
}
