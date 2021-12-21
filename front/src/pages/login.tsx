import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import Router from 'next/router';
import LoginForm from '../containers/LoginForm';

const Login: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
