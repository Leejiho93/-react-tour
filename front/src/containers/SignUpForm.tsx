import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupAsync } from '../modules/user';

const SignUpForm = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const dispatch = useDispatch();

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
  const onSubmitForm = (e: React.FormEvent) => {
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
      <form onSubmit={onSubmitForm}>
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
