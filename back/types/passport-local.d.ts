import { Strategy as PassportStrategy } from "passport-strategy";
import express = require("express");

interface IStrategyOptions {
  usernameField?: string;
  passwordField?: string;
  session?: boolean;
  passReqToCallback?: false;
}

interface IStrategyOptionsWithRequest {
  usernameField?: string;
  passwordField?: string;
  session?: boolean;
  passReqToCallback: true;
}

interface IVerifyOptions {
  message: string;
}

interface VerifyFunctionWithRequest {
  (
    req: express.Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ): void;
}

interface VerifyFunction {
  (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ): void;
}

declare class Strategy extends PassportStrategy {
  constructor(
    options: IStrategyOptionsWithRequest,
    verify: VerifyFunctionWithRequest
  );
  constructor(options: IStrategyOptions, verify: VerifyFunction);
  constructor(verify: VerifyFunction);

  name: string;
}
