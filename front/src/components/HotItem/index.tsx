import * as React from 'react';
import { RegionItem } from '../../modules/detail';
import { HotImage, HotTitle, Wrapper } from './style';
import Link from 'next/link';

interface IHotItem {
  list: RegionItem;
}

const HotItem: React.FC<IHotItem> = ({ list }) => {
  const filter = list.title.match(/\[.*\]/);
  return (
    <>
      <Link href={`/detail/${list.contenttypeid}/${list.contentid}`} passHref>
        <a>
          <Wrapper>
            <HotTitle>
              {filter ? list.title.replace(filter[0], '') : list.title}
            </HotTitle>
            <HotImage src={list.firstimage} alt="이미지" />
          </Wrapper>
        </a>
      </Link>
    </>
  );
};

export default HotItem;
