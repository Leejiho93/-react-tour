import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
  ${({ theme }) => theme.window.tablet} {
    width: 100%;
    & a {
      width: 90%;
    }
  }
`;
