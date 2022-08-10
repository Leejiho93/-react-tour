import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 420px;
  padding: 30px;
  margin: 30px auto;
  border: 1px solid #d9d9d9;
  ${({ theme }) => theme.window.mobileL} {
    width: 94%;
    margin: 0 auto;
    margin-top: 30px;
  }
`;

export const Title = styled.div`
  margin: 20px 0 50px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

export const LoginLabel = styled(Form.Item)`
  & label {
    font-size: 16px;
  }
`;

export const LoginInput = styled(Input)`
  height: 50px;
  border-radius: 5px;
`;

export const LoginPassword = styled(Input.Password)`
  height: 50px;
  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  text-align: end;
  margin: 10px 0 20px;
`;

export const LoginButton = styled(Button)`
  width: 100%;
  height: 45px;
  background-color: #fea939;
  border-radius: 20px;
  color: #fff;
  outline: 0;
  border: none;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: #feb139;
    color: #fff;
  }
  &:active {
    background-color: #feb139;
    color: #fff;
  }
  &:focus {
    background-color: #feb139;
    color: #fff;
  }
`;

export const SubWrapper = styled.div`
  width: 100%;
  text-align: center;
  & a {
    color: #5b5b5b;
  }
`;

export const LoginError = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: red;
`;

export const SNSForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
