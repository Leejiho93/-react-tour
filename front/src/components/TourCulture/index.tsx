import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourCulture: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const { infocenterculture, parkingculture, parkingfee, usetimeculture } =
    item.intro[0];
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {infocenterculture ? (
          <SubItem name="문의" html={infocenterculture} />
        ) : null}
        {parkingculture ? <SubItem name="주차" html={parkingculture} /> : null}
        {parkingfee ? <SubItem name="요금" html={parkingfee} /> : null}
        {usetimeculture ? (
          <SubItem name="이용시간" html={usetimeculture} />
        ) : null}

        {item.info ? (
          Array.isArray(item.info) ? (
            item.info.map((v) => (
              <SubItem key={v.infoname} name={v.infoname} html={v.infotext} />
            ))
          ) : (
            <SubItem name={item.info.infoname} html={item.info.infotext} />
          )
        ) : null}
      </ul>
    </IntroWrapper>
  );
};

export default TourCulture;
