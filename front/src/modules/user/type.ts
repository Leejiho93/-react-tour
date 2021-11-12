import { Axios, AxiosError } from 'axios';
import { ActionType } from 'typesafe-actions';
import * as action from './action';

export type LoginPayload = {
  userId: string;
  password: string;
};

export type LoginResponse = Record<string, unknown>;

export type SignupPayload = {
  userId: string;
  nickname: string;
  email: string;
  password: string;
};

export type LoadUserPayload = {
  id?: string;
};

export type UserState = {
  isLoggingin: boolean;
  isLoggingout: boolean;
  loginError: Error | string | AxiosError;
  isSignedup: boolean;
  isSigningup: boolean;
  signupError: Error | string;
  me: Record<string, unknown> | null;
};

export type UserAction = ActionType<typeof action>;
