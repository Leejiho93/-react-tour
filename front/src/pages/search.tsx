import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import {
  PaginationCustom,
  Title,
  TitleWrapper,
  Wrapper,
} from '../../styles/common';
import KategorySkeleton from '../components/KategorySkeleton';
import Layout from '../components/Layout';
import SortBox from '../components/SortBox';
import TourList from '../components/TourList';
import { RootState } from '../modules';
import { searchAsync } from '../modules/detail';
import { loadUserAsync } from '../modules/user';
import { SagaStore, wrapper } from './_app';

const Search: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.searchResult
  );
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState<number>(1);
  const [arrange, setArrange] = useState<'P' | 'Q'>('Q');
  const search = String(router.query.search);
  const { items, totalCount } = data;
  const item = items && items.item;

  const onChange = useCallback((page) => {
    setPageNo(page);
  }, []);

  const sortHot = useCallback(() => {
    setArrange('P');
  }, []);
  const sortRecent = useCallback(() => {
    setArrange('Q');
  }, []);

  useEffect(() => {
    dispatch(
      searchAsync.request({
        search: search,
        pageNo: pageNo,
        arrange: arrange,
      })
    );
  }, [search, pageNo, arrange, dispatch]);

  return (
    <Layout>
      <Wrapper>
        <TitleWrapper>
          <Title>{search}</Title>
        </TitleWrapper>

        <SortBox arrange={arrange} sortHot={sortHot} sortRecent={sortRecent} />
        <div>
          {loading ? <KategorySkeleton /> : <TourList list={item} />}
          <PaginationCustom
            total={totalCount}
            showSizeChanger={false}
            defaultPageSize={12}
            onChange={onChange}
            current={pageNo}
          />
        </div>
      </Wrapper>
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

export default Search;
