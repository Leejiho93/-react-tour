import * as React from 'react';
import { useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignupLayout from '../components/SignupLayout';
import SignUpForm from '../containers/SignUpForm';
import { RootState } from '../modules';
import { signupAsync, SIGN_UP_REQUEST } from '../modules/user';

const Signup = () => {
  return <SignUpForm />;
};

export default Signup;

Signup.getLayout = function getLayout(page: ReactElement) {
  return <SignupLayout>{page}</SignupLayout>;
};
