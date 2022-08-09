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
  Ul,
  MyAvatar,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { logoutAsync } from '../../modules/user';
import SearchForm from '../SearchForm';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar } from 'antd';
import HeadItem from '../../components/HeaderItem';
import useToggle from '../../../utils/useToggle';
import Image from 'next/image';
import useInput from '../../../utils/useInput';

const Navbar: React.FC = () => {
  const [toggle, toggleHanburger, setToggle] = useToggle(false);
  const { me } = useSelector((state: RootState) => state.user);
  const [search, onChangeSearch] = useInput('');
  const dispatch = useDispatch();
  const onClickLogout = React.useCallback(() => {
    dispatch(logoutAsync.request());
    setToggle(false);
  }, [dispatch, setToggle]);

  const closeHamburger = React.useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  const menu = (
    <Menu>
      <Menu.Item key="내정보">
        <Link href="/profile">
          <a>내정보</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="로그아웃" onClick={onClickLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      <NavbarWrapper>
        <Logo onClick={closeHamburger}>
          <Link href="/">
            <a>
              <Image
                src="/logo.png"
                width={137}
                height={60}
                alt="어디갈래"
                priority={true}
              />
            </a>
          </Link>
        </Logo>

        <Category toggle={toggle} onClick={toggleHanburger}>
          <Ul>
            <HeadItem title="관광지" contentTypeId={12} />
            <HeadItem title="문화시설" contentTypeId={14} />
            <HeadItem title="축제" contentTypeId={15} />
            <HeadItem title="코스" contentTypeId={25} />
            <HeadItem title="레포츠" contentTypeId={28} />
            <HeadItem title="숙박" contentTypeId={32} />
            <HeadItem title="쇼핑" contentTypeId={38} />
            <HeadItem title="식당" contentTypeId={39} />
          </Ul>
        </Category>

        <Search>
          <SearchForm
            label="pc"
            search={search}
            onChangeSearch={onChangeSearch}
          />
        </Search>

        <Account toggle={toggle}>
          {me ? (
            <>
              <Dropdown overlay={menu}>
                <MyAvatar size={40}>{me.nickname.slice(0, 2)}</MyAvatar>
              </Dropdown>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <a onClick={closeHamburger}>
                  <UserOutlined></UserOutlined>
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
        <SearchForm
          label="mobile"
          search={search}
          onChangeSearch={onChangeSearch}
        />
      </MobileSearch>
    </Wrapper>
  );
};

export default Navbar;
