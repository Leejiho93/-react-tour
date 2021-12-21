import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourSpot: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const { infocenter, usetime } = item.intro;
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {infocenter ? <SubItem name="문의" html={infocenter} /> : null}
        {usetime ? <SubItem name="이용시간" html={usetime} /> : null}

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

export default TourSpot;
