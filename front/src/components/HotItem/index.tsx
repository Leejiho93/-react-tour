import * as React from 'react';
import { RegionItem } from '../../modules/detail';
import { HotImage, HotTitle, Wrapper } from './style';
import Link from 'next/link';

interface IHotItem {
  list: RegionItem;
}

const HotItem: React.FC<IHotItem> = ({ list }) => {
  const filter = list.title.match(/\[.*\]/);
  const { contenttypeid, contentid, firstimage, title } = list;
  return (
    <>
      <Link href={`/detail/${contenttypeid}/${contentid}`} passHref>
        <a>
          <Wrapper>
            <HotTitle>{filter ? title.replace(filter[0], '') : title}</HotTitle>
            {firstimage ? (
              <HotImage
                src={firstimage}
                alt={title}
                width={150}
                height={100}
                layout="responsive"
                priority={true}
              />
            ) : null}
          </Wrapper>
        </a>
      </Link>
    </>
  );
};

export default HotItem;
