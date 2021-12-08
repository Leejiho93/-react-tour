import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import user from './user';
import detail from './detail';
import userSaga from './user/saga';
import detailSaga from './detail/saga';

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
    })(state, action);
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([call(userSaga), call(detailSaga)]);
}
