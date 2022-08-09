import Image from 'next/image';
import styled from 'styled-components';

export const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailItemTitle = styled.h2`
  font-size: 50px;
  font-weight: 600;
  padding: 50px 0;
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
    text-align: center;
    padding: 100px 0 50px;
  }
  ${({ theme }) => theme.window.tablet} {
    font-size: 45px;
  }
  ${({ theme }) => theme.window.mobileL} {
    font-size: 40px;
  }
`;

export const DetailItemImage = styled(Image)`
  width: 980px;
  padding: 0 0 50px 0;
  ${({ theme }) => theme.window.laptop} {
    width: 100%;
  }
  ${({ theme }) => theme.window.tablet} {
    padding: 0;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
  }
`;

export const DetailItemInfo = styled.h3`
  border-bottom: 2px solid black;
  width: 100%;
  font-family: BMJUA;
  font-size: 30px;
  font-weight: 600;
  margin: 30px 0;
  padding: 20px 10px 15px;

  & span {
    font-size: 18px;
    font-family: BMHANNAAir;
  }
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
  }
  ${({ theme }) => theme.window.tablet} {
    font-size: 27px;
    & span {
      font-size: 16px;
    }
  }
`;

export const DetailItemOverview = styled.div<{ more: boolean }>`
  line-height: 1.5;
  font-weight: 600;
  font-size: 17px;
  font-family: 'Gowun Batang', serif;
  height: ${(props) => (props.more ? '100%;' : '155px;')} 
  overflow: hidden;

  
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
    line-height: 1.3;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  border: 1px solid #000;
  cursor: pointer;
  padding: 5px;
  font-weight: 600;
  & span {
    padding: 0 3px;
    font-size: 15px;
  }
  margin: 15px 0;
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
  }
`;
