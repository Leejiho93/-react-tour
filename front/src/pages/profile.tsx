import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { RootState } from '../modules';

const Profile: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  React.useEffect(() => {
    if (!me) {
      router.replace('/', '/');
    }
  }, [me, router]);
  return (
    <Layout>
      {me ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '150px',
          }}
        >
          <div>닉네임: {me.nickname}</div>
          <div>닉네임 변경, 내가 쓴 댓글 보기 추가중</div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '150px',
          }}
        >
          잘못된 접근
        </div>
      )}
    </Layout>
  );
};

export default Profile;
