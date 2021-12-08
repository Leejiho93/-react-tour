import styled from 'styled-components';

export const DtailWrapper = styled.div`
  width: 980px;
  margin: 0 auto;
  ${({ theme }) => theme.window.laptop} {
    width: 100%;
  }
`;
