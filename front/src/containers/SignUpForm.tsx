import Router from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { signupAsync } from '../modules/user';

const SignUpForm: React.FC = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const dispatch = useDispatch();

  const { me, isSignedup, signupError } = useSelector(
    (state: RootState) => state.user
  );

  React.useEffect(() => {
    if (me) {
      console.log(me.data);
      Router.push('/');
    }
  }, [me]);

  React.useEffect(() => {
    if (isSignedup) {
      console.log('회원가입 완료했습니다.');
      Router.push('/'); //로그인하면 회원가입 페이지가 메인페이지로 바뀜
    }
  }, [isSignedup]);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      signupAsync.request({
        userId: id,
        email,
        password,
        nickname,
      })
    );
  };
  return (
    <>
      <div>{signupError}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="user-id">아이디</label>
        <input value={id} id="user-id" onChange={onChangeId} />
        <br />
        <label htmlFor="email">이메일</label>
        <input value={email} id="email" onChange={onChangeEmail} />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onChangePassword}
        />
        <br />
        <label htmlFor="nickname">닉네임</label>
        <input value={nickname} id="nickname" onChange={onChangeNickname} />
        <br />
        <button>가입하기</button>
        <br />
      </form>
    </>
  );
};

export default SignUpForm;
