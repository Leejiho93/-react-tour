import * as React from 'react';

import { RegionProps } from '../../modules/detail';
import HotItem from '../HotItem';
import MainSkelton from '../MainSkeleton';
import { Wrapper } from './style';

const HotList = ({ list }: RegionProps) => {
  return (
    <Wrapper>
      {list ? (
        list.map((item) => <HotItem list={item} key={item.contentid} />)
      ) : (
        <MainSkelton />
      )}
    </Wrapper>
  );
};
export default HotList;
