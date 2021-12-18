import { Spin } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
import SortBox from '../components/SortBox';
import TourList from '../components/TourList';
import { RootState } from '../modules';
import { regionAsync } from '../modules/detail';
import { loadUserAsync } from '../modules/user';
import { SagaStore, wrapper } from './_app';

const Region = () => {
  const router = useRouter();
  const [areaCode, setAreaCode] = useState(undefined);
  const [pageNo, setPageNo] = useState(1);
  const [arrange, setArrange] = useState('P');
  const { title, contentTypeId, area } = router.query;
  const [areaName, setAreaName] = useState([
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
  ]);
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.regionResult
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      regionAsync.request({
        arrange: arrange,
        areaCode: areaCode,
        contentTypeId: Number(contentTypeId),
        pageNo: pageNo,
      })
    );
  }, [areaCode, pageNo, arrange, contentTypeId, dispatch]);

  const onChange = (page: number) => {
    setPageNo(page);
  };
  const changeAreaCode = (code: any) => () => {
    setAreaCode(code);
  };

  const sortHot = () => {
    setArrange('P');
  };
  const sortRecent = () => {
    setArrange('Q');
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>

      <Select>
        <Ul>
          {areaName.map((item) => (
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
        <Spin spinning={loading}>
          <TourList list={data.items.item} />
        </Spin>
        <PaginationCustom
          total={data.totalCount}
          showSizeChanger={false}
          onChange={onChange}
        />
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers!.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers!.Cookie = cookie;
      }
      if (!store.getState().user.me) {
        store.dispatch(loadUserAsync.request());
      }
      store.dispatch(
        regionAsync.request({
          contentTypeId: Number(query.contentTypeId),
          arrange: 'P',
          areaCode: undefined,
        })
      );
      store.dispatch(END);

      return await (store as SagaStore).sagaTask!.toPromise();
    }
);

export default Region;
