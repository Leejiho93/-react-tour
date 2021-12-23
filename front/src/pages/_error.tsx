import { NextPageContext, NextPage } from 'next';

interface ErrorComponentProps {
  statusCode?: number | null;
}
const Error: NextPage<ErrorComponentProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode ? `서버 ${statusCode} 에러 발생` : '클라이언트 에러 발생'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
