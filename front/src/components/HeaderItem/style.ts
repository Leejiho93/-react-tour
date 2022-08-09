import styled from 'styled-components';

export const Li = styled.li`
  ${({ theme }) => theme.window.tablet} {
    & a {
      font-family: ''
      display: block;
      width: 100;
    }
  }
`;
