import {
  SignupPayload,
  SignupResponse,
  LoginResponse,
  LoginPayload,
} from './type';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_RESET = 'SIGN_UP_RESET';

export const signupAsync = createAsyncAction(
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
)<SignupPayload, SignupResponse, AxiosError>();

export const loginAsync = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<LoginPayload, LoginResponse, AxiosError>();

export const logoutAsync = createAsyncAction(
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
)<undefined, undefined, AxiosError>();

export const loadUserAsync = createAsyncAction(
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
)<undefined, LoginResponse, AxiosError>();

export const signupReset = createStandardAction(SIGN_UP_RESET)();
