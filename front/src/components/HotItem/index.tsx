import * as React from 'react';
import { RegionPropsItem } from '../../modules/detail';
import { HotImage, HotTitle, Wrapper } from './style';
import Link from 'next/link';

const HotItem = ({ list }: RegionPropsItem) => {
  const filter: any = list.title.match(/\[.*\]/gi);
  return (
    <>
      <Link href={`/detail/${list.contenttypeid}/${list.contentid}`} passHref>
        <a>
          <Wrapper>
            <HotTitle>{list.title.replace(filter, '')}</HotTitle>
            <HotImage src={list.firstimage} alt="이미지" />
          </Wrapper>
        </a>
      </Link>
    </>
  );
};

export default HotItem;
