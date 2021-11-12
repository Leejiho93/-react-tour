import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginLayout from '../components/LoginLayout';
import Layout from '../components/Layout';
import { RootState } from '../modules';
import { loginAsync } from '../modules/user';
import Router from 'next/router';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { me, loginError } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (me) {
      console.log(me.data);
      Router.push('/');
    }
  }, [me]);

  React.useEffect(() => {
    if (loginError) {
      console.log(loginError);
    }
  }, [loginError]);

  const onChagneId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginAsync.request({ userId: id, password }));
  };

  return (
    <>
      {/* {loginError ? loginError : null} */}
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor="user-id">아이디</label>
        <input type="text" id="user-id" value={id} onChange={onChagneId} />
        <br />
        <label htmlFor="user-password">비밀번호</label>
        <input
          type="password"
          id="user-password"
          value={password}
          onChange={onChangePassword}
        />
        <br />
        {loginError ? loginError : null}
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;

// Login.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };
