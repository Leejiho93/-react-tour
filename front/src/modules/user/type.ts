import { ActionType } from 'typesafe-actions';
import * as action from './action';

// export type LoginPayload = {
//   id: string;
//   password: string;
// };

export type LoginResponse = {
  id: string;
  nickname: string;
};

export type SignupPayload = {
  userId: string;
  nickname: string;
  email: string;
  password: string;
};

// export type SignupRequest = {
//   userId: string;
//   email: string;
//   password: string;
//   nickname: string;
// };

// export type SignupAction = {
//   type: string;
//   payload: SignupRequest;
// };

export type UserState = {
  isLoggingin: boolean;
  isLoggingout: boolean;
  loginError: string;
  isSignedup: boolean;
  isSigningup: boolean;
  signupError: string;
  me: Record<string, unknown> | null;
};

export type UserAction = ActionType<typeof action>;
