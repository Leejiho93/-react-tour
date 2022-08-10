import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourSports: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const { infocenterleports, reservation, usetimeleports } = item.intro[0];
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {reservation ? <SubItem name="예약" html={reservation} /> : null}
        {infocenterleports ? (
          <SubItem name="문의" html={infocenterleports} />
        ) : null}
        {usetimeleports ? (
          <SubItem name="이용시간" html={usetimeleports} />
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

export default TourSports;
