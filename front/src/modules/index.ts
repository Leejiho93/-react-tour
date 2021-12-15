import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import user from './user';
import detail from './detail';
import comment from './comment';
import userSaga from './user/saga';
import detailSaga from './detail/saga';
import commentSaga from './comment/saga';

axios.defaults.baseURL = `http://localhost:8081/api`;
axios.defaults.withCredentials = true;

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    console.log('HYDRATE state', state);
    console.log('HYDRATE action', action);
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combineReducers({
      user,
      detail,
      comment,
    })(state, action);
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([call(userSaga), call(detailSaga), call(commentSaga)]);
}
