import * as React from 'react';
import SingupNavbar from './SingupNavbar';

type Props = { children: JSX.Element };

const SignupLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SingupNavbar />
      <div>{children}</div>
    </>
  );
};

export default SignupLayout;
