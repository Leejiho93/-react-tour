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
import SearchForm from '../../containers/SearchForm';
import { Avatar } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import HeadItem from '../HeaderItem';

const Navbar: React.FC = () => {
  const [toggle, setToggle] = React.useState(false);
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logoutAsync.request());
    setToggle(false);
  };
  const toggleHanburger = () => {
    setToggle(!toggle);
  };
  const falseHamburger = () => {
    setToggle(false);
  };
  return (
    <Wrapper>
      <NavbarWrapper>
        <Logo onClick={falseHamburger}>
          <Link href="/">
            <a>
              <span>어디갈래</span>
            </a>
          </Link>
        </Logo>

        <Category toggle={toggle} onClick={falseHamburger}>
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
              {/* <Avatar>{me.nickname}</Avatar> */}
              <LogoutButton onClick={onClickLogout}>로그아웃 </LogoutButton>
            </>
          ) : (
            <>
              <Link href="/login">
                <a onClick={falseHamburger}>
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
      <MobileSearch onClick={falseHamburger}>
        <SearchForm />
      </MobileSearch>
    </Wrapper>
  );
};

export default Navbar;
