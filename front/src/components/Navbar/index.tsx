import * as React from 'react';
import Link from 'next/link';
import { NavbarWrapper, Logo, Search, Account } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { logoutAsync } from '../../modules/user';
import SearchForm from '../../containers/SearchForm';

const Navbar: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logoutAsync.request());
  };
  return (
    <NavbarWrapper>
      <Logo>
        <Link href="/">Tour</Link>
      </Logo>
      <Search>
        <SearchForm />
      </Search>
      <Account>
        {me ? (
          <>
            <button onClick={onClickLogout}>로그아웃 </button>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
          </>
        )}
      </Account>
    </NavbarWrapper>
  );
};

export default Navbar;
