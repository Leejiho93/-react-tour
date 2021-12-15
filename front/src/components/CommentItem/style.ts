import { Comment } from 'antd';
import styled from 'styled-components';

export const CommentStyle = styled(Comment)<{ mine: 1 | 0 }>`
  border-bottom: 1px solid #e5e5e5;
  background-color: ${(props) => (props.mine ? '#f0f0f0' : '#fff')};
  padding: 0px 20px;
  //   margin-bottom: 2px;
`;

// #f9f9fa
