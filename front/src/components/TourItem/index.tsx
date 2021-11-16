import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { SearchPropsItem } from '../../modules/detail';

const Img = styled.img`
  width: 200px;
  height: 120px;
`;

const TourItem = ({ item }: SearchPropsItem) => {
  const { title, addr1, firstimage2, firstimage, contentid } = item;
  const router = useRouter();
  const onClick = () => {
    router.push({
      pathname: `/detail/${contentid}`,
    });
  };
  return (
    <div style={{ display: 'flex' }}>
      <div onClick={onClick}>
        <Img src={firstimage2 ? firstimage2 : firstimage} />
      </div>
      <div>
        <p>{title}</p>
        <p>주소: {addr1}</p>
      </div>
    </div>
  );
};

export default TourItem;
