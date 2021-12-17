import { AxiosError } from 'axios';
import { ActionType } from 'typesafe-actions';
import * as action from './action';

export type LoginPayload = {
  userId: string;
  password: string;
};

export type LoginResponse = {
  data: Me;
};

export type Me = {
  id: number;
  nickname: string;
  userId: string;
};

export type SignupPayload = {
  userId: string;
  nickname: string;
  email?: string;
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
  me: Me | null;
};

export type UserAction = ActionType<typeof action>;
