import * as React from 'react';
import { RegionItem } from '../../modules/detail';
import { HotImage, HotTitle, Wrapper } from './style';
import Link from 'next/link';

interface IHotItem {
  list: RegionItem;
}

const HotItem = ({ list }: IHotItem) => {
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
