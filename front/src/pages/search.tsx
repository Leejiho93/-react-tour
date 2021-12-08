import { Pagination, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PaginationCustom,
  SortButton,
  SortWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from '../../styles/common';
import SortBox from '../components/SortBox';
import TourList from '../components/TourList';
import { RootState } from '../modules';
import { searchAsync } from '../modules/detail';

const Search = () => {
  const router = useRouter();
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.searchResult
  );
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [arrange, setArrange] = useState('Q');
  const search = String(router.query.search);
  const { items, totalCount } = data;
  const item = items.item;

  const onChange = (page: number) => {
    console.log('onchange searchasync', page);
    setPageNo(page);
  };

  const sortHot = () => {
    setArrange('P');
  };
  const sortRecent = () => {
    setArrange('Q');
  };

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
    <Wrapper>
      <TitleWrapper>
        <Title>{search}</Title>
      </TitleWrapper>

      <SortBox arrange={arrange} sortHot={sortHot} sortRecent={sortRecent} />
      <div>
        <Spin spinning={loading}>
          <TourList list={item} />
        </Spin>

        <PaginationCustom
          total={totalCount}
          showSizeChanger={false}
          defaultPageSize={12}
          onChange={onChange}
          current={pageNo}
        />
      </div>
    </Wrapper>
  );
};

export default Search;
