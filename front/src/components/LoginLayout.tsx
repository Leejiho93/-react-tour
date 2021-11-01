import * as React from 'react';
import LoginNavbar from './LoginNavbar';

type Props = { children: JSX.Element };

const LoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <LoginNavbar />
      <div>{children}</div>
    </>
  );
};

export default LoginLayout;
