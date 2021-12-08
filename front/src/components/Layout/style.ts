import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
  ${({ theme }) => theme.window.pc} {
    width: 100%;
  }
  ${({ theme }) => theme.window.laptop} {
  }
`;
