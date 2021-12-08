import React, { useEffect } from 'react';
import { SearchItem, SearchProps } from '../../modules/detail';
import TourItem from '../TourItem';
import { EmptyResult, ListWrapper } from './style';

const TourList = ({ list }: SearchProps) => {
  // useEffect(() => {
  //   console.log('list', list);
  // });
  return (
    <ListWrapper>
      {list ? (
        Array.isArray(list) ? (
          list.map((item: SearchItem) => (
            <TourItem list={item} key={item.contentid} />
          ))
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
