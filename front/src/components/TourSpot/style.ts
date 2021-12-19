import styled from 'styled-components';

export const Li = styled.li`
  width: 50%;
  float: left;
  font-family: 'Gowun Batang', serif;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  & p {
    font-size: 17px;
    padding: 5px 0;
    a {
      word-break: break-all;
      color: #000;
    }
  }
  & b {
    font-weight: bold;
  }
  ${({ theme }) => theme.window.tablet} {
    width: 100%;
    float: none;
  }
`;

export const IntroWrapper = styled.div`
  margin-top: 50px;
  width: 100%;

  ${({ theme }) => theme.window.laptop} {
    width: 90%;
  }
`;
