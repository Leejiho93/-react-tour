import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { logoutAsync } from '../../modules/user';
import Navbar from '../Navbar';
import { MainWrapper } from './style';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};

export default Layout;
