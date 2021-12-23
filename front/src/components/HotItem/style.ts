import Image from 'next/image';
import styled from 'styled-components';

export const HotImage = styled(Image)`
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
  ${({ theme }) => theme.window.pc} {
    font-size: 27px;
  }

  ${({ theme }) => theme.window.laptop} {
    font-size: 25px;
  }
  ${({ theme }) => theme.window.tablet} {
    font-size: 23px;
  }
  ${({ theme }) => theme.window.mobileL} {
    font-size: 27px;
  }
  ${({ theme }) => theme.window.mobileM} {
    font-size: 25px;
  }
  ${({ theme }) => theme.window.mobileS} {
    font-size: 23px;
  }
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
    width: 100%;
    margin: 0px;
  }
`;
