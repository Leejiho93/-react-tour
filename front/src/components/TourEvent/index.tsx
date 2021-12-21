import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourEvent: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage, tel } = item;
  const { usetimefestival, playtime, discountinfofestival } = item.intro;
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {tel ? <SubItem name="문의" html={tel} /> : null}
        {usetimefestival ? (
          <SubItem name="요금" html={usetimefestival} />
        ) : null}
        {playtime ? <SubItem name="일정" html={playtime} /> : null}
        {discountinfofestival ? (
          <SubItem name="할인" html={discountinfofestival} />
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

export default TourEvent;
