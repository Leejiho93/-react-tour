import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

export const Wrapper = styled.div`
  height: 80vh;
  width: 500px;
  padding: 30px;
  margin: 0 auto;
  margin-top: 100px;
  // border: 1px solid #000;
  ${({ theme }) => theme.window.mobileL} {
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
  }
`;

export const Title = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 40px;
  margin-bottom: 60px;
  font-family: BMJUA;
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
  margin-bottom: 20px;
`;

export const SignupButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: #1a73e8;
  border-radius: 5px;
  color: #fff;

  &:hover {
    background-color: #1890ff;
    color: #fff;
  }
`;

export const ValidationError = styled.div`
  color: red;
  margin-bottom: 10px;
  margin-top: -5px;
`;
