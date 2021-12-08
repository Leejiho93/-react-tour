import * as React from 'react';
import Link from 'next/link';

const HeadItem = ({ title, contentTypeId }: any) => {
  return (
    <>
      <Link
        href={{
          pathname: '/tour',
          query: { title: title, contentTypeId: contentTypeId },
        }}
      >
        <a>
          <li>{title}</li>
        </a>
      </Link>
    </>
  );
};

export default HeadItem;
