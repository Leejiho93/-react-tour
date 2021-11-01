import * as React from 'react';
import LoginLayout from '../components/LoginLayout';

const Login = () => {
  return (
    <>
      <form action="">
        <input type="text" />
        <br />
        <input type="text" />
        <br />
        <button>로그인</button>
      </form>

      {/* <Link href="/signup">
        <div>회원가입</div>
      </Link> */}
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
