import { Form, Button } from 'antd';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  padding: 10px;
  ${({ theme }) => theme.window.laptop} {
    width: 95%;
    margin: 0 auto;
  }
`;

export const ButtonWrapper = styled(Form.Item)`
  text-align: end;
`;

export const TextAreaWrapper = styled(Form.Item)`
  margin-bottom: 10px;
`;
export const TextArea = styled.textarea`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
`;

export const SubmitButton = styled(Button)`
  background-color: #ffae59;
  border: #1a73e8;
  border-radius: 5px;
  &:hover {
    background-color: #ffb86e;
  }
`;
