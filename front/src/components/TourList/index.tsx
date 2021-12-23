import React from 'react';
import { RegionItem, SearchItem } from '../../modules/detail';
import TourItem from '../TourItem';
import { EmptyResult, ListWrapper } from './style';

interface ITourList {
  list: SearchItem[] | RegionItem[] | '';
}

const TourList: React.FC<ITourList> = ({ list }) => {
  return (
    <ListWrapper>
      {list ? (
        Array.isArray(list) ? (
          list.map((item) => <TourItem list={item} key={item.contentid} />)
        ) : (
          <TourItem list={list} />
        )
      ) : (
        <EmptyResult>검색 결과가 없습니다.</EmptyResult>
      )}
    </ListWrapper>
  );
};

export default TourList;
