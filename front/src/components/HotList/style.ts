import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
  ${({ theme }) => theme.window.pc} {
    width: 100%;
    & a {
      width: 31%;
      margin: 5px;
    }
  }
  ${({ theme }) => theme.window.laptop} {
    width: 100%;
    & a {
      width: 45%;
    }
  }

  ${({ theme }) => theme.window.mobileL} {
    width: 100%;
    margin-bottom: 60px;
    & a {
      width: 90%;
    }
  }
`;
