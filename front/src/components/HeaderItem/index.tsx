import * as React from 'react';
import Link from 'next/link';

interface IHeadItem {
  title: string;
  contentTypeId: number;
}

const HeadItem: React.FC<IHeadItem> = ({ title, contentTypeId }) => {
  return (
    <>
      <Link
        href={{
          pathname: '/tour',
          query: { title, contentTypeId },
        }}
        as={`/tour?title=${title}&contentTypeId=${contentTypeId}`}
      >
        <a>
          {/* <li>{title}</li> */}
          <li>{title}</li>
        </a>
      </Link>
    </>
  );
};

export default HeadItem;
