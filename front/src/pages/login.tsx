import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import Router from 'next/router';
import LoginForm from '../containers/LoginForm';

const Login: React.FC = () => {
  const { me, loginError } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (me) {
      console.log(me.data);
      Router.push('/');
    }
  }, [me]);

  React.useEffect(() => {
    if (loginError) {
      console.log('loginError: ', loginError);
    }
  }, [loginError]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
