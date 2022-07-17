import * as React from 'react';
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
import useInput from '../../../utils/useInput';

const LoginForm: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, setPassword] = React.useState('');
  const [validate, setValidate] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { loginError } = useSelector((state: RootState) => state.user);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g;
    regex.test(e.target.value) ? setValidate(true) : setValidate(false);
    setPassword(e.target.value);
  };
  const onSubmit = React.useCallback(() => {
    validate
      ? dispatch(loginAsync.request({ userId: id, password }))
      : passwordRef.current && passwordRef.current.focus();
  }, [id, password, validate, dispatch]);

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
            maxLength={20}
            ref={passwordRef}
          />
        </LoginLabel>
        {password === '' ? null : validate ? null : (
          <p>
            비밀번호는 8~20글자이고, 숫자,문자,특수문자 모두 포함해야합니다.
          </p>
        )}
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
