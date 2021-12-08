import { HotMenu } from '../../../styles/common';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

const HotTitle = ({ title, contentTypeId }: any) => {
  return (
    <>
      <HotMenu>
        <span>인기 {title}</span>
        <Link
          href={{
            pathname: '/tour',
            query: { title: title, contentTypeId: contentTypeId },
          }}
        >
          <a>
            <span>더보기</span>
            <span>
              <ArrowRightOutlined />
            </span>
          </a>
        </Link>
      </HotMenu>
    </>
  );
};

export default HotTitle;
