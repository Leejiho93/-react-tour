import React, { useEffect, useState } from 'react';
import { DetailItemProps, DetailPropsItem } from '../../modules/detail';
import Image from 'next/image';
import {
  ButtonWrapper,
  DetailItemImage,
  DetailItemInfo,
  DetailItemOverview,
  DetailItemTitle,
  DetailItemWrapper,
} from './style';
import TourSpot from '../TourSpot';
import TourCulture from '../TourCulture';
import TourEvent from '../TourEvent';
import TourCourse from '../TourCourse';
import TourSports from '../TourSports';
import TourSleep from '../TourSleep';
import TourMall from '../TourMall';
import TourFood from '../TourFood';
import CommentForm from '../../containers/CommentForm';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const DetailItem = ({ item }: DetailItemProps) => {
  const {
    title,
    firstimage,
    firstimage2,
    overview,
    homepage,
    contenttypeid,
    addr1,
    intro,
  } = item;

  const [more, setMore] = useState(true);
  const [minHeight, setMinHeight] = useState(false);

  useEffect(() => {
    const moreHeight = document.getElementById('moreDiv')!.clientHeight;
    if (moreHeight < 160) {
      setMinHeight(true);
    } else {
      setMore(!more);
    }
  }, []);

  const onToggle = () => {
    setMore(!more);
  };

  return (
    <>
      <DetailItemWrapper>
        <DetailItemTitle>{title}</DetailItemTitle>
        <DetailItemImage
          src={firstimage ? firstimage : firstimage2}
          alt="대표이미지"
        />
        <DetailItemInfo>상세정보</DetailItemInfo>
        <DetailItemOverview
          id="moreDiv"
          more={more}
          dangerouslySetInnerHTML={{
            __html: overview.replaceAll(/\s[*]/g, '<br/><br/>*'),
          }}
        />

        {minHeight ? null : (
          <ButtonWrapper onClick={onToggle}>
            {!more ? (
              <>
                <b>더보기</b>
                <span>
                  <CaretDownOutlined />
                </span>
              </>
            ) : (
              <>
                <b>닫기</b>
                <span>
                  <CaretUpOutlined />
                </span>
              </>
            )}
          </ButtonWrapper>
        )}

        {/* <ul>
          <li>
            <b>주소</b> {addr1}
          </li>
          <li>
            <p
              dangerouslySetInnerHTML={{
                __html: homepage,
              }}
            />
          </li>
        </ul> */}

        {(() => {
          switch (contenttypeid) {
            case 12:
              return <TourSpot item={item} />;
            case 14:
              return <TourCulture item={item} />;
            case 15:
              return <TourEvent item={item} />;
            case 25:
              return <TourCourse item={item} />;
            case 28:
              return <TourSports item={item} />;
            case 32:
              return <TourSleep item={item} />;
            case 38:
              return <TourMall item={item} />;
            case 39:
              return <TourFood item={item} />;
            default:
              null;
          }
        })()}
      </DetailItemWrapper>
    </>
  );
};

export default DetailItem;
