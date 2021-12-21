import * as React from 'react';

import { RegionItem } from '../../modules/detail';
import HotItem from '../HotItem';
import MainSkelton from '../MainSkeleton';
import { Wrapper } from './style';

interface IHotList {
  list: RegionItem[];
}

const HotList: React.FC<IHotList> = ({ list }) => {
  return (
    <Wrapper>
      {list.length === 0 ? (
        <MainSkelton />
      ) : (
        list.map((item) => <HotItem list={item} key={item.contentid} />)
      )}
    </Wrapper>
  );
};
export default HotList;
