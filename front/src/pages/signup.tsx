import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FormTitle } from '../../styles/common';
import Footer from '../components/Footer';
import SignUpForm from '../containers/SignUpForm';

const Signup: React.FC = () => {
  return (
    <>
      <FormTitle>
        <Link href="./">
          <a>
            <Image src="/sign.png" alt="어디갈래" width={305} height={96} />
          </a>
        </Link>
      </FormTitle>
      <SignUpForm />
      <Footer />
    </>
  );
};

export default Signup;
