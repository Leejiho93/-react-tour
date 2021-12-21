import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourMall: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const { infocentershopping, shopguide, opentime, restdateshopping } =
    item.intro;
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {infocentershopping ? (
          <SubItem name="문의" html={infocentershopping} />
        ) : null}
        {shopguide ? <SubItem name="안내" html={shopguide} /> : null}
        {restdateshopping ? (
          <SubItem name="휴일" html={restdateshopping} />
        ) : null}
        {opentime ? <SubItem name="이용시간" html={opentime} /> : null}

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

export default TourMall;
