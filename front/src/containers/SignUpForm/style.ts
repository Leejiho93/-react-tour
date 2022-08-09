import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

export const Wrapper = styled.div`
  width: 420px;
  padding: 30px;
  margin: 30px auto 66px;
  border: 1px solid #d9d9d9;
  ${({ theme }) => theme.window.mobileL} {
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
  }
`;

export const Title = styled.div`
  margin: 20px 0 50px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: red;
`;

export const SignupLabel = styled(Form.Item)`
  & label {
    font-size: 16px;
  }
`;

export const SignupInput = styled(Input)`
  height: 50px;
  border-radius: 5px;
`;

export const SignupPassword = styled(Input.Password)`
  height: 50px;
  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  text-align: end;
  margin: 10px 0 20px;
`;

export const SignupButton = styled(Button)`
  width: 100%;
  height: 45px;
  border-radius: 20px;
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

export const ValidationError = styled.div`
  color: red;
  margin-bottom: 10px;
  margin-top: -5px;
`;
