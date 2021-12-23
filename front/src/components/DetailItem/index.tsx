import React, { useEffect } from 'react';
import { DetailItemprops } from '../../modules/detail';
import {
  ButtonWrapper,
  DetailItemImage,
  DetailItemInfo,
  DetailItemOverview,
  DetailItemTitle,
  DetailItemWrapper,
  ImageWrapper,
} from './style';
import TourSpot from '../TourSpot';
import TourCulture from '../TourCulture';
import TourEvent from '../TourEvent';
import TourCourse from '../TourCourse';
import TourSports from '../TourSports';
import TourSleep from '../TourSleep';
import TourMall from '../TourMall';
import TourFood from '../TourFood';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Kakaomap from '../Kakaomap';
import useToggle from '../../../utils/useToggle';

const DetailItem: React.FC<DetailItemprops> = ({ item }) => {
  const { title, firstimage, overview, contenttypeid } = item;
  const [more, onToggleMore] = useToggle(true);
  const [minHeight, onToggleMinHeight] = useToggle(false);

  useEffect(() => {
    const moreHeight = (document.getElementById('moreDiv') as HTMLDivElement)
      .clientHeight;
    if (moreHeight < 155) {
      onToggleMinHeight();
    } else {
      onToggleMore();
    }
  }, [onToggleMore, onToggleMinHeight]);

  return (
    <>
      <DetailItemWrapper>
        <DetailItemTitle>{title}</DetailItemTitle>
        <ImageWrapper>
          {firstimage && (
            <DetailItemImage
              src={firstimage}
              alt={title}
              width={980}
              height={800}
              layout="responsive"
            />
          )}
        </ImageWrapper>
        <DetailItemInfo>상세정보</DetailItemInfo>
        <DetailItemOverview
          id="moreDiv"
          more={more}
          dangerouslySetInnerHTML={{
            __html: overview.replaceAll(/\s[*]/g, '<br/><br/>*'),
          }}
        />

        {minHeight ? null : (
          <ButtonWrapper onClick={onToggleMore}>
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

        {<Kakaomap item={item} />}

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
