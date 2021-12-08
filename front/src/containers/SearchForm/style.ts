import styled from 'styled-components';

export const Input = styled.input`
  border-radius: 15px 0 0 15px;
  color: #fff;
  border: 2px solid #333333;
  background-color: #333333;
  border-right: none;
  padding: 15px;
  width: 200px;
  height: 45px;
  outline: none;
  font-weight: bold;
  font-family: BMHANNAAir;
  font-size: 18px;
  letter-spacing: 1px;
  ${({ theme }) => theme.window.laptop} {
  }
  ${({ theme }) => theme.window.tablet} {
  }
  ${({ theme }) => theme.window.mobileS} {
  }
`;

export const SearchButton = styled.button`
  width: 45px;
  height: 45px;
  background: #333333;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 0 15px 15px 0;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  ${({ theme }) => theme.window.laptop} {
    justify-content: center;
  }
  ${({ theme }) => theme.window.tablet} {
  }
  ${({ theme }) => theme.window.mobileS} {
  }
`;
