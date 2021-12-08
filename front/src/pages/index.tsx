import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { allAsync } from '../modules/detail';
import HotList from '../components/HotList';
import HotTitle from '../components/HotTitle';

const Home = () => {
  const { data } = useSelector((state: RootState) => state.detail.allData);
  const region = data.items.item;
  const festival = data.items.festival;
  const sleep = data.items.sleep;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allAsync.request());
  }, [dispatch]);
  return (
    <>
      <div>
        <HotTitle title="관광지" contentTypeId={12} />
        <HotList list={region} />
      </div>

      <div>
        <HotTitle title="축제" contentTypeId={15} />
        <HotList list={festival} />
      </div>

      <div>
        <HotTitle title="숙소" contentTypeId={32} />
        <HotList list={sleep} />
      </div>
    </>
  );
};

export default Home;
