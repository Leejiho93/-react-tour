import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TourList from '../components/TourList';
import { RootState } from '../modules';
import { searchAsync } from '../modules/detail';

const Search = () => {
  const { data, loading } = useSelector(
    (state: RootState) => state.detail.searchResult
  );
  const dispatch = useDispatch();
  const { items, totalCount } = data;

  const onChange = (page: number) => {
    dispatch(searchAsync.request({ search: data.search, pageNo: page }));
  };

  return (
    <>
      <Spin spinning={loading}>
        <TourList list={items.item} />
      </Spin>

      <Pagination
        total={totalCount}
        showSizeChanger={false}
        onChange={onChange}
      />
    </>
  );
};

// export const GetServerSideProps = async () => {
//   try {
//   } catch (e) {}
// };

export default Search;
