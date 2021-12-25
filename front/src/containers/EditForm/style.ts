import styled from 'styled-components';
import { Button } from 'antd';

export const CancelButton = styled(Button)`
  background-color: #999999;
  border: #999999;
  margin-left: 5px;
  border-radius: 5px;
  color: #fff;
  &:hover {
    background-color: #a2a2a2;
    color: #fff;s
  }
`;

export const ButtonWrapper = styled.div`
  text-align: end;
  margin-bottom: 0px;
  .ant-btn-primary {
    background-color: #ffae59;
    border: #1a73e8;
    border-radius: 5px;
    &:hover {
      background-color: #ffb86e;
    }
`;
