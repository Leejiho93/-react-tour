import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginAsync } from '../../modules/user';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginError } from './style';
import { RootState } from '../../modules';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { loginError } = useSelector((state: RootState) => state.user);

  const onChagneId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmit = () => {
    dispatch(loginAsync.request({ userId: id, password }));
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <Form {...formItemLayout} autoComplete="off" onFinish={onSubmit}>
        <Form.Item
          label="아이디"
          name="id"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <Input
            prefix={<UserOutlined />}
            value={id}
            onChange={onChagneId}
            id="id"
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            id="password"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Item>

        <Button htmlType="submit">로그인 </Button>
        <div>
          <Link href="/signup">회원가입</Link>
        </div>
        {loginError && <LoginError>{loginError}</LoginError>}
      </Form>
    </>
  );
};

export default LoginForm;
