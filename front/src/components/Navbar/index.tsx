import * as React from 'react';
import Link from 'next/link';
import { NavbarWrapper, Logo, A, Account } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { logoutAsync } from '../../modules/user';

const Navbar: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logoutAsync.request());
  };
  return (
    <NavbarWrapper>
      <A></A>
      <Logo>
        <Link href="/">Tour</Link>
      </Logo>
      <Account>
        {me ? (
          <>
            <button onClick={onClickLogout}>로그아웃 </button>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </Account>
    </NavbarWrapper>
  );
};

export default Navbar;
