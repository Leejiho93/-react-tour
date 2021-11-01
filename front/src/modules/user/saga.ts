import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  signupAsync,
} from './action';
import {
  // LoginResponse,
  // LoginPayload,
  SignupResponse,
  SignupRequest,
  // SignupAction,
} from './type';
import {
  put,
  takeEvery,
  takeLatest,
  call,
  all,
  fork,
} from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

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

// function signupAPI(signupData: SignupRequest) {
function signupAPI(signupData: SignupRequest) {
  console.log('signupAPI data', signupData);
  return axios.post('/user/signup', signupData);
}

function* signupSaga(action: ReturnType<typeof signupAsync.request>) {
  try {
    const result: AxiosResponse = yield call(signupAPI, action.payload);
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
