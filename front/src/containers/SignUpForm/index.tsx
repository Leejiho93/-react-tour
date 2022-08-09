import * as React from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
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
  Wrapper,
} from './style';
import { SubWrapper, ButtonWrapper } from '../LoginForm/style';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import useInput from '../../../utils/useInput';

const SignUpForm: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, setPassword] = React.useState('');
  const [nickname, onChangeNickname] = useInput('');
  const [validate, setValidate] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const nicknameRef = React.useRef<Input>(null);
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

  React.useEffect(() => {
    if (signupError === '이미 사용중인 닉네임입니다.') {
      nicknameRef.current && nicknameRef.current.focus();
    }
  }, [signupError]);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/g;
    regex.test(e.target.value) ? setValidate(true) : setValidate(false);
    setPassword(e.target.value);
  };

  const onSubmit = useCallback(() => {
    validate
      ? dispatch(
          signupAsync.request({
            userId: id,
            password,
            nickname,
          })
        )
      : passwordRef.current && passwordRef.current.focus();
  }, [id, password, nickname, validate, dispatch]);
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
          rules={[
            { required: true, message: '비밀번호를 입력해주세요.' },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g,
              message:
                '비밀번호는 8~20글자이고, 숫자,문자,특수문자 모두 포함해야합니다.',
            },
          ]}
        >
          <SignupPassword
            prefix={<LockOutlined />}
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            maxLength={20}
            ref={passwordRef}
          />
        </SignupLabel>

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
            ref={nicknameRef}
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
