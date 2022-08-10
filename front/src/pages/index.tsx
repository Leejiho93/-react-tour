import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { allAsync, AllResult } from '../modules/detail';
import HotList from '../components/HotList';
import HotTitle from '../components/HotTitle';
import { SagaStore, wrapper } from './_app';
import { loadUserAsync } from '../modules/user';
import axios from 'axios';
import { END } from 'redux-saga';
import Layout from '../components/Layout';
import MainSkelton from '../components/MainSkeleton';
import { useEffect } from 'react';

const Home: React.FC<AllResult> = () => {
  const { data } = useSelector((state: RootState) => state.detail.allData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allAsync.request());
  }, [dispatch]);

  return (
    <Layout>
      {data ? (
        <>
          <div>
            <HotTitle title="관광지" contentTypeId={12} />
            <HotList list={data.items.item} />
          </div>

          <div>
            <HotTitle title="축제" contentTypeId={15} />
            <HotList list={data.items.festival} />
          </div>

          <div>
            <HotTitle title="숙소" contentTypeId={32} />
            <HotList list={data.items.sleep} />
          </div>
        </>
      ) : (
        <MainSkelton />
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      if (axios.defaults.headers) {
        req && cookie
          ? (axios.defaults.headers.Cookie = cookie)
          : (axios.defaults.headers.Cookie = '');
      }

      store.dispatch(loadUserAsync.request());
      store.dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
      return { props: {} };
    }
);

export default Home;
