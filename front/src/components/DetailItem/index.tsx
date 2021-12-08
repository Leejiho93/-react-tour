import React, { useEffect } from 'react';
import { DetailPropsItem } from '../../modules/detail';
import Image from 'next/image';
import {
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

const DetailItem = ({ item }: DetailPropsItem) => {
  const {
    title,
    firstimage,
    firstimage2,
    overview,
    homepage,
    contenttypeid,
    intro,
  } = item;
  useEffect(() => {
    console.log('detailitem', item);
  });
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
          dangerouslySetInnerHTML={{
            __html: overview.replaceAll('*', '<br/><br/>*'),
          }}
        />

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
