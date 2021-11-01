import { signupAsync } from './action';
import { SignupPayload } from './type';
import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import axios from 'axios';

// function loginAPI(loginData: LoginPayload) {
//   return axios.post('/user/login', loginData, {
//     withCredentials: true,
//   });
// }

// function* login(action: ReturnType<typeof loginAsync.success>) {
//   try {
//     const result: LoginResponse = yield call(loginAPI, action.payload);
//     yield put(loginAsync.success(result));
//   } catch (e) {
//     yield put(loginAsync.failure(e));
//   }
// }

// export function* watchLogin() {
//   yield takeLatest(LOG_IN_REQUEST, login);
// }

function signupAPI(signupData: SignupPayload) {
  return axios.post('/user/signup', signupData);
}

function* signupSaga(action: ReturnType<typeof signupAsync.request>) {
  try {
    const result: SignupPayload = yield call(signupAPI, action.payload);
    yield put(signupAsync.success(result));
  } catch (e) {
    if (e instanceof Error) {
      yield put(signupAsync.failure(e));
    }
  }
}

export function* watchSignup() {
  yield takeLatest(signupAsync.request, signupSaga);
}

export default function* userSaga() {
  yield all([fork(watchSignup)]);
}
