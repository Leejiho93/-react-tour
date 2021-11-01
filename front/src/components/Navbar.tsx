import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  display: flex;
  height: 50px;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </NavbarWrapper>
  );
};

export default Navbar;
