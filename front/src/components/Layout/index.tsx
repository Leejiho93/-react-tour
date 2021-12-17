import * as React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { MainWrapper } from './style';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </>
  );
};

export default Layout;
