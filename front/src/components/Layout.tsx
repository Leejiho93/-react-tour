import * as React from 'react';
import Navbar from './Navbar';

type Props = { children: JSX.Element };

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <div>메인 페이지 레이아웃!!!</div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
