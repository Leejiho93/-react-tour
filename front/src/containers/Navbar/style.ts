import styled from 'styled-components';

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  height: 80px;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #eeeeee;
  background-color: #fff;
  ${({ theme }) => theme.window.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MobileSearch = styled.div`
  display: none;
  height: 50px;
  ${({ theme }) => theme.window.laptop} {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);
    & form {
      width: 100%;
      margin: 0 5%;
    }

    & form input {
      width: 100%;
    }
  }
  ${({ theme }) => theme.window.mobileS} {
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1.5;
  ${({ theme }) => theme.window.laptop} {
  }
  ${({ theme }) => theme.window.tablet} {
    & div {
      left: 30px;
    }
  }
`;

export const Category = styled.div<{ toggle: boolean }>`
  display: flex;
  flex: 3;
  justify-content: center;
  & ul {
    display: flex;
  }
  & a {
    font-size: 18px;
    font-family: BMJUA;
    color: #000;
    margin-left: 10px;
  }
  ${({ theme }) => theme.window.tablet} {
    display: ${(props) => (props.toggle ? 'block' : 'none')};
    width: 100%;
    & ul {
      width: 100%;
      flex-direction: column;
    }
    & ul li {
      margin-left: 0;
      width: 100%;
      text-align: center;
      &:hover {
        background-color: #e2e2e2;
      }
    }
    & a {
      padding: 12px 5px;
      margin-left: 0;
      font-size: 22px;
    }
  }
`;

export const Ul = styled.ul`
  margin-bottom: 0;
  margin-top: 15px;
  ${({ theme }) => theme.window.laptop} {
    margin-right: 60px;
  }
  ${({ theme }) => theme.window.tablet} {
    margin-right: 0px;
  }
`;

export const Search = styled.div`
  display: flex;
  justify-content: center;
  flex: 2;
  ${({ theme }) => theme.window.laptop} {
    display: none;
  }
`;

export const Account = styled.div<{ toggle: boolean }>`
  display: flex;
  flex: 0.5;
  justify-content: center;
  font-size: 28px;
  & a {
    color: #000;
  }
  ${({ theme }) => theme.window.tablet} {
    display: ${(props) => (props.toggle ? 'flex' : 'none')};
    width: 100%;
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  ${({ theme }) => theme.window.tablet} {
    display: block;
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 30px;
  }
`;

export const LogoutButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #5f6368;
  border-radius: 4px;
  background-color: #e8eaed;
  color: #3c3d40;
  margin-right: 30px;
  cursor: pointer;
  font-family: 'Gowun Batang', serif;
  font-weight: 600;
  ${({ theme }) => theme.window.tablet} {
    border: none;
    color: #000;
    background-color: #fff;
    padding: 12px 5px;
    font-family: BMJUA;
    font-size: 22px;
    margin-right: 0px;
    width: 100%;
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;
