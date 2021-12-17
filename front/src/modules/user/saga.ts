import { signupAsync, loginAsync, logoutAsync, loadUserAsync } from './action';
import {
  SignupPayload,
  LoginPayload,
  LoginResponse,
  LoadUserPayload,
  Me,
} from './type';
import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

//회원가입
function signupAPI(signupData: SignupPayload) {
  return axios.post('/user/signup', signupData);
}

function* signupSaga(action: ReturnType<typeof signupAsync.request>) {
  try {
    const result: SignupPayload = yield call(signupAPI, action.payload);
    yield put(signupAsync.success(result));
  } catch (e) {
    console.error(e);
    const err = e as AxiosError;
    if (err.response) {
      yield put(signupAsync.failure(err.response.data));
    }
  }
}

export function* watchSignup() {
  yield takeLatest(signupAsync.request, signupSaga);
}

// 로그인
function loginAPI(loginData: LoginPayload) {
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const result: LoginResponse = yield call(loginAPI, action.payload);
    console.log('login saga result', result);
    yield put(loginAsync.success(result));
  } catch (e) {
    console.error(e);
    const err = e as AxiosError;
    if (err.response) {
      yield put(loginAsync.failure(err.response.data));
    }
  }
}

export function* watchLogin() {
  yield takeLatest(loginAsync.request, loginSaga);
}

// 로그아웃
function logoutAPI() {
  axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    }
  );
}

function* logoutSaga() {
  try {
    yield call(logoutAPI);
    yield put(logoutAsync.success());
  } catch (e) {
    console.error(e);
    yield put(logoutAsync.failure(e as AxiosError));
  }
}

export function* watchLogout() {
  yield takeLatest(logoutAsync.request, logoutSaga);
}

// 로그인 유지

function loadUserAPI() {
  return axios.get(`/user/`);
}

function* loadUserSaga() {
  try {
    const result: LoginResponse = yield call(loadUserAPI);
    yield put(loadUserAsync.success(result.data));
  } catch (e) {
    yield put(loadUserAsync.failure(e as AxiosError));
  }
}

export function* watchLoadUser() {
  yield takeLatest(loadUserAsync.request, loadUserSaga);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
  ]);
}
