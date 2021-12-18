import { SignupResult, LoginResult, SignupPayload, LoginPayload } from './type';
import { signupAsync, loginAsync, logoutAsync, loadUserAsync } from './action';
import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import axios from 'axios';

//회원가입
function signupAPI(signupData: SignupPayload) {
  return axios.post('/user/signup', signupData);
}
function* signupSaga(action: ReturnType<typeof signupAsync.request>) {
  try {
    const result: SignupResult = yield call(signupAPI, action.payload);
    yield put(signupAsync.success(result.data));
  } catch (e: any) {
    yield put(signupAsync.failure(e.response.data));
  }
}
export function* watchSignup() {
  yield takeLatest(signupAsync.request, signupSaga);
}

// 로그인
function loginAPI(loginData: LoginPayload) {
  return axios.post('/user/login', loginData);
}
function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const result: LoginResult = yield call(loginAPI, action.payload);
    yield put(loginAsync.success(result.data));
  } catch (e: any) {
    yield put(loginAsync.failure(e.response.data));
  }
}
export function* watchLogin() {
  yield takeLatest(loginAsync.request, loginSaga);
}

// 로그아웃
function logoutAPI() {
  axios.post('/user/logout', {});
}
function* logoutSaga() {
  try {
    yield call(logoutAPI);
    yield put(logoutAsync.success());
  } catch (e: any) {
    yield put(logoutAsync.failure(e.response.data));
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
    const result: LoginResult = yield call(loadUserAPI);
    yield put(loadUserAsync.success(result.data));
  } catch (e: any) {
    yield put(loadUserAsync.failure(e.response.data));
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
