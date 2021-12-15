import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginAsync } from '../../modules/user';
import { Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  ButtonWrapper,
  LoginButton,
  LoginError,
  LoginInput,
  LoginLabel,
  LoginPassword,
  SubWrapper,
  Title,
  Wrapper,
} from './style';
import { RootState } from '../../modules';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { loginError } = useSelector((state: RootState) => state.user);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmit = () => {
    dispatch(loginAsync.request({ userId: id, password }));
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      {loginError && <LoginError>{loginError}</LoginError>}
      <Form autoComplete="off" onFinish={onSubmit}>
        <LoginLabel
          name="id"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <LoginInput
            prefix={<UserOutlined />}
            value={id}
            onChange={onChangeId}
            id="id"
            placeholder="아이디"
          />
        </LoginLabel>
        <LoginLabel
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <LoginPassword
            prefix={<LockOutlined />}
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
        </LoginLabel>

        <ButtonWrapper>
          <LoginButton htmlType="submit">로그인 </LoginButton>
        </ButtonWrapper>

        <SubWrapper>
          <Link href="/signup">회원가입</Link>
        </SubWrapper>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
