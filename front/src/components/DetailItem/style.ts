import styled from 'styled-components';

export const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailItemTitle = styled.h2`
  font-family: BMJUA;
  font-size: 50px;
  font-weight: 600;
  padding: 100px 0 50px;
  ${({ theme }) => theme.window.tablet} {
    font-size: 45px;
    width: 90%;
  }
  ${({ theme }) => theme.window.mobileL} {
    font-size: 40px;
  }
`;

export const DetailItemImage = styled.img`
  width: 980px;
  padding: 0 0 50px 0;
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

export const DetailItemOverview = styled.div`
  line-height: 1.5;
  font-family: BMHANNAAir;
  font-weight: 500;
  font-size: 19px;
  // height: 200px;
  // overflow: hidden;
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
    line-height: 1.3;
  }
`;
