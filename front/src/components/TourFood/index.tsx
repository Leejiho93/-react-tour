import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourFood: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const {
    restdatefood,
    reservationfood,
    opentimefood,
    treatmenu,
    infocenterfood,
  } = item.intro;
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {infocenterfood ? <SubItem name="문의" html={infocenterfood} /> : null}
        {treatmenu ? <SubItem name="메뉴" html={treatmenu} /> : null}
        {reservationfood ? (
          <SubItem name="에약" html={reservationfood} />
        ) : null}
        {restdatefood ? <SubItem name="휴일" html={restdatefood} /> : null}
        {opentimefood ? <SubItem name="이용시간" html={opentimefood} /> : null}

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

export default TourFood;
