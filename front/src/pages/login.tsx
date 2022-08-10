import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import Router from 'next/router';
import LoginForm from '../containers/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
import { FormTitle, LoadingBar } from '../../styles/common';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const { me, isLoggingin } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (me) {
      Router.replace('/');
    }
  }, [me]);

  return (
    <>
      <FormTitle>
        <Link href="/">
          <a>
            <Image src="/sign.png" alt="어디갈래" width={305} height={96} />
          </a>
        </Link>
      </FormTitle>
      <LoadingBar size="large" spinning={isLoggingin}>
        <LoginForm />
      </LoadingBar>
      <Footer />
    </>
  );
};

export default Login;
