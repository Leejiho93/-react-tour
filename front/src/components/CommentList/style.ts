import styled from 'styled-components';

export const Wrapper = styled.div`
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;

  ${({ theme }) => theme.window.laptop} {
    width: 95%;
    margin: 0 auto 30px;
  }
`;

export const CommentTitle = styled.div`
  padding: 10px 20px;
  font-family: BMeuljiro;
  font-size: 25px;
  margin-top: 50px;

  & span {
    font-family: BMJUA;
    font-size: 16px;
    padding: 0 10px;
  }
  ${({ theme }) => theme.window.laptop} {
    padding: 10px 30px;
  }
`;
