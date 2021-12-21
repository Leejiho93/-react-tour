import * as React from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { signupAsync, signupReset } from '../../modules/user';
import {
  ErrorMessage,
  SignupButton,
  SignupInput,
  SignupLabel,
  SignupPassword,
  Title,
  ValidationError,
  Wrapper,
} from './style';
import { SubWrapper, ButtonWrapper } from '../LoginForm/style';
import { Form } from 'antd';
import Link from 'next/link';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import useInput from '../../../utils/useInput';

const SignUpForm: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const dispatch = useDispatch();

  const { me, isSignedup, isSigningup, signupError } = useSelector(
    (state: RootState) => state.user
  );

  React.useEffect(() => {
    if (me) {
      Swal.fire({
        title: '잘못된 접근',
        text: '홈 화면으로 이동합니다.',
        icon: 'warning',
      }).then(() => {
        Router.push('/');
      });
    }
  }, [me]);

  React.useEffect(() => {
    if (isSignedup) {
      Swal.fire({
        title: '회원가입 성공',
        text: '로그인 화면으로 이동합니다.',
        icon: 'success',
      }).then(() => {
        dispatch(signupReset());
        Router.push('/login');
      });
    }
  }, [isSignedup, dispatch]);

  const onSubmit = useCallback(() => {
    const checkPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    if (!checkPassword.test(password)) {
      return setPasswordErrorMessage(
        '8~20자의 영문자, 숫자, 특수문자를 사용하세요.'
      );
    } else {
      setPasswordErrorMessage('');
    }

    dispatch(
      signupAsync.request({
        userId: id,
        password,
        nickname,
      })
    );
  }, [id, password, nickname, dispatch]);
  return (
    <Wrapper>
      <Title>회원가입</Title>

      <ErrorMessage>{signupError}</ErrorMessage>
      <Form onFinish={onSubmit}>
        <SignupLabel
          name="id"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <SignupInput
            prefix={<UserOutlined />}
            value={id}
            onChange={onChangeId}
            id="id"
            placeholder="아이디"
          />
        </SignupLabel>

        <SignupLabel
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <SignupPassword
            prefix={<LockOutlined />}
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
        </SignupLabel>
        <ValidationError>{passwordErrorMessage}</ValidationError>

        <SignupLabel
          name="nickname"
          rules={[{ required: true, message: '닉네임를 입력해주세요.' }]}
        >
          <SignupInput
            prefix={<SmileOutlined />}
            value={nickname}
            onChange={onChangeNickname}
            id="nickname"
            placeholder="닉네임"
          />
        </SignupLabel>
        <ButtonWrapper>
          <SignupButton htmlType="submit" loading={isSigningup}>
            가입하기
          </SignupButton>
        </ButtonWrapper>
        <SubWrapper>
          <Link href="/login">로그인</Link>
        </SubWrapper>
      </Form>
    </Wrapper>
  );
};

export default SignUpForm;
