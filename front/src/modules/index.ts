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
import { IUserReducerState } from './user/reducer';
import { ICommentReducerState } from './comment/reducer';
import { IDetailReducerState } from './detail/reducer';

const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://13.124.28.44'
    : `http://localhost:8081/api`;
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export interface IReducerState {
  user: IUserReducerState;
  comment: ICommentReducerState;
  detail: IDetailReducerState;
}

const rootReducer = (
  state: IReducerState | undefined,
  action: AnyAction
): IReducerState => {
  if (action.type === HYDRATE) {
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

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export function* rootSaga() {
  yield all([call(userSaga), call(detailSaga), call(commentSaga)]);
}
