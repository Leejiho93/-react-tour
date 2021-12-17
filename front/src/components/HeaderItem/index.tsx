import * as React from 'react';
import Link from 'next/link';

const HeadItem = ({ title, contentTypeId, area }: any) => {
  return (
    <>
      <Link
        href={{
          pathname: '/tour',
          query: { title, contentTypeId, area },
        }}
        as={`/tour?title=${title}&contentTypeId=${contentTypeId}`}
      >
        <a>
          <li>{title}</li>
        </a>
      </Link>
    </>
  );
};

export default HeadItem;
