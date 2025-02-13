import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import {
  Li,
  PaginationCustom,
  Select,
  Title,
  TitleWrapper,
  Ul,
  Wrapper,
} from '../../styles/common';
import KategorySkeleton from '../components/KategorySkeleton';
import Layout from '../components/Layout';
import SortBox from '../components/SortBox';
import TourList from '../components/TourList';
import { RootState } from '../modules';
import { regionAsync } from '../modules/detail';
import { loadUserAsync } from '../modules/user';
import { SagaStore, wrapper } from './_app';

const areaArray = [
  ['전체', undefined],
  ['서울', 1],
  ['인천', 2],
  ['대전', 3],
  ['대구', 4],
  ['광주', 5],
  ['부산', 6],
  ['울산', 7],
  ['세종', 8],
  ['경기', 31],
  ['강원', 32],
  ['충북', 33],
  ['충남', 34],
  ['경북', 35],
  ['경남', 36],
  ['전북', 37],
  ['전남', 38],
  ['제주', 39],
];

const Tour: React.FC = () => {
  const router = useRouter();
  const { title, contentTypeId } = router.query;
  const [areaCode, setAreaCode] = useState<number | undefined>(undefined);
  const [pageNo, setPageNo] = useState<number>(1);
  const [arrange, setArrange] = useState<'P' | 'Q'>('P');

  const { data, loading } = useSelector(
    (state: RootState) => state.detail.regionResult
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setAreaCode(undefined);
    setPageNo(1);
  }, [title]);

  useEffect(() => {
    setPageNo(1);
  }, [areaCode]);

  useEffect(() => {
    if (!contentTypeId) {
      return;
    }

    dispatch(
      regionAsync.request({
        arrange: arrange,
        areaCode: areaCode,
        contentTypeId: Number(contentTypeId),
        pageNo: pageNo,
      })
    );
  }, [areaCode, pageNo, arrange, contentTypeId, dispatch]);

  const onChange = useCallback((page) => {
    setPageNo(page);
  }, []);
  const changeAreaCode = useCallback(
    (code) => () => {
      setAreaCode(code);
    },
    []
  );

  const sortHot = useCallback(() => {
    setArrange('P');
  }, []);
  const sortRecent = useCallback(() => {
    setArrange('Q');
  }, []);
  return (
    <Layout>
      <Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>

        <Select>
          <Ul>
            {areaArray.map((item) => (
              <Li
                className={item[1] === areaCode ? 'active' : ''}
                onClick={changeAreaCode(item[1])}
                key={item[0]}
              >
                {item[0]}
              </Li>
            ))}
          </Ul>
        </Select>

        <SortBox arrange={arrange} sortHot={sortHot} sortRecent={sortRecent} />
        <div>
          {loading ? <KategorySkeleton /> : <TourList list={data.items.item} />}
          <PaginationCustom
            total={data.totalCount}
            showSizeChanger={false}
            onChange={onChange}
            defaultPageSize={12}
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

export default Tour;
