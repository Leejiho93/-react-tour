import * as React from 'react';
import Link from 'next/link';
import {
  NavbarWrapper,
  Logo,
  Search,
  Account,
  Category,
  MobileSearch,
  Wrapper,
  HamburgerMenu,
  LogoutButton,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { logoutAsync } from '../../modules/user';
import SearchForm from '../SearchForm';
import { MenuOutlined } from '@ant-design/icons';
import HeadItem from '../../components/HeaderItem';
import useToggle from '../../../utils/useToggle';

const Navbar: React.FC = () => {
  const [toggle, toggleHanburger, setToggle] = useToggle(false);
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onClickLogout = React.useCallback(() => {
    dispatch(logoutAsync.request());
    setToggle(false);
  }, [dispatch, setToggle]);

  const closeHamburger = React.useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  return (
    <Wrapper>
      <NavbarWrapper>
        <Logo onClick={closeHamburger}>
          <Link href="/">
            <a>
              <h1>어디갈래</h1>
            </a>
          </Link>
        </Logo>

        <Category toggle={toggle} onClick={toggleHanburger}>
          <ul>
            <HeadItem title="관광지" contentTypeId={12} />
            <HeadItem title="문화시설" contentTypeId={14} />
            <HeadItem title="축제" contentTypeId={15} />
            <HeadItem title="코스" contentTypeId={25} />
            <HeadItem title="레포츠" contentTypeId={28} />
            <HeadItem title="숙박" contentTypeId={32} />
            <HeadItem title="쇼핑" contentTypeId={38} />
            <HeadItem title="식당" contentTypeId={39} />
          </ul>
        </Category>

        <Search>
          <SearchForm />
        </Search>

        <Account toggle={toggle}>
          {me ? (
            <>
              <LogoutButton onClick={onClickLogout}>로그아웃 </LogoutButton>
            </>
          ) : (
            <>
              <Link href="/login">
                <a onClick={closeHamburger}>
                  <span>로그인</span>
                </a>
              </Link>
            </>
          )}
        </Account>
        <HamburgerMenu>
          <MenuOutlined onClick={toggleHanburger} />
        </HamburgerMenu>
      </NavbarWrapper>
      <MobileSearch onClick={closeHamburger}>
        <SearchForm />
      </MobileSearch>
    </Wrapper>
  );
};

export default Navbar;
