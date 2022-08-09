import * as React from 'react';
import Link from 'next/link';
import { Li } from './style';

interface IHeadItem {
  title: string;
  contentTypeId: number;
}

const HeadItem: React.FC<IHeadItem> = ({ title, contentTypeId }) => {
  return (
    <Li>
      <Link
        href={{
          pathname: '/tour',
          query: { title, contentTypeId },
        }}
        as={`/tour?title=${title}&contentTypeId=${contentTypeId}`}
      >
        <a>{title}</a>
      </Link>
    </Li>
  );
};

export default HeadItem;
