import { ActionType } from 'typesafe-actions';
import * as action from './action';

// 유저 초기값
export interface UserState {
  isLoggingin: boolean;
  isLoggingout: boolean;
  loginError: Error | string;
  isSignedup: boolean;
  isSigningup: boolean;
  signupError: Error | string;
  me: LoginResponse | null;
}

// 회원가입
export interface SignupPayload {
  userId: string;
  nickname: string;
  password: string;
}
export interface SignupResult {
  data: SignupResponse;
}
export interface SignupResponse {
  userId: string;
  nickname: string;
  createdAt: string;
  password: string;
  updatedAt: string;
}

// 로그인
export interface LoginPayload {
  userId: string;
  password: string;
}
export interface LoginResult {
  data: LoginResponse;
}
export interface LoginResponse {
  id: number;
  nickname: string;
  userId: string;
}

export type UserAction = ActionType<typeof action>;
