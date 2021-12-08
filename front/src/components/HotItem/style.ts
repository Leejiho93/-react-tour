import styled from 'styled-components';

export const HotImage = styled.img`
  ${({ theme }) => theme.window.pc} {
    // width: 320px;
    // height: 230px;
    width: 100%;
  }
  width: 400px;
  height: 250px;
  transition: transform 1s ease;
  transform: scale(1.5);
`;

export const HotTitle = styled.div`
  display: flex;
  font-family: BMHANNA, sans-serif;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  width: 400px;
  z-index: 10;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 400px;
  overflow: hidden;
  margin: 5px;

  &:hover img {
    transform: scale(1.2);
  }
  ${({ theme }) => theme.window.pc} {
    width: 360px;
    height: 220px;
  }

  ${({ theme }) => theme.window.laptop} {
  }
  ${({ theme }) => theme.window.tablet} {
    width: 100%;
  }
`;
