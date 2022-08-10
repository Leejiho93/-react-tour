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
  }
  ${({ theme }) => theme.window.mobileL} {
    height: 320px;
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
  width: 260px;
  height: 140px;
  background-color: #fff;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 20%);
  padding: 10px;

  & div {
    margin-bottom: 30px;
  }
  & span {
    font-size: 18px;
    font-weight: bold;
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
    width: 280px;
    height: 100px;

    & div {
      margin-bottom: 5px;
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
