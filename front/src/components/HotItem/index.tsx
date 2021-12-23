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
            {list.firstimage ? (
              <HotImage
                src={list.firstimage}
                alt={list.title}
                width={400}
                height={250}
                layout="responsive"
              />
            ) : null}
          </Wrapper>
        </a>
      </Link>
    </>
  );
};

export default HotItem;
