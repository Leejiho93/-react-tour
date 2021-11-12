import * as React from 'react';
import { ReactElement } from 'react';
import SignupLayout from '../components/SignupLayout';
import SignUpForm from '../containers/SignUpForm';
import Layout from '../components/Layout';

const Signup = () => {
  return <SignUpForm />;
};

export default Signup;

// Signup.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };
