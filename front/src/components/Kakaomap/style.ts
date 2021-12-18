import styled from 'styled-components';

export const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 70px 0 0;
  ${({ theme }) => theme.window.laptop} {
    width: 90%;
  }
`;

export const Map = styled.div`
  width: 980px;
  height: 400px;
  position: relative;

  ${({ theme }) => theme.window.laptop} {
  }
  ${({ theme }) => theme.window.tablet} {
    height: 350px;
  }
  ${({ theme }) => theme.window.mobileL} {
    height: 250px;
  }
`;

export const IwContentWrapper = styled.div`
  width: 360px;
  height: 200px;
`;

export const Infowindow = styled.div`
  position: absolute;
  text-align: center;
  z-index: 99;
  width: 240px;
  height: 120px;
  background-color: #fff;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 20%);
  padding: 20px;

  & div {
    margin-bottom: 20px;
  }
  & span {
    font-size: 20px;
    font-family: BMJUA;
  }

  & b {
    background-color: #5b5b5b;
    padding: 5px 10px;
    margin-top: 10px;
    border-radius: 10px;
    color: #fff;

    &: hover {
      font-weight: bold;
    }

    & span {
      font-size: 18px;
    }
  }
  ${({ theme }) => theme.window.mobileL} {
    width: 200px;
    height: 100px;

    & div {
      margin-bottom: 10px;
    }
    & span {
      font-size: 18px;
    }
    & b {
      padding: 2px 5px;
      font-size: 15px;
    }
  }
`;
