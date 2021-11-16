import { Pagination, Spin } from 'antd';
import React, { useEffect } from 'react';
import { SearchData, SearchItem, SearchProps } from '../../modules/detail';
import TourItem from '../TourItem';

const TourList = ({ list }: SearchProps) => {
  return (
    <>
      {list ? (
        list.map((item: SearchItem) => (
          <TourItem item={item} key={item.contentid} />
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </>
  );
};

export default TourList;
