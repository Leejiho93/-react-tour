import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import SubItem from '../SubItem';
import { IntroWrapper } from '../SubItem/style';

const TourSleep: React.FC<DetailItemprops> = ({ item }) => {
  const { addr1, homepage } = item;
  const {
    reservationlodging,
    reservationurl,
    checkintime,
    checkouttime,
    refundregulation,
    scalelodging,
  } = item.intro;
  return (
    <IntroWrapper>
      <ul>
        {addr1 ? <SubItem name="주소" html={addr1} /> : null}
        {homepage ? <SubItem name="홈페이지" html={homepage} /> : null}
        {reservationlodging ? (
          <SubItem name="문의" html={reservationlodging} />
        ) : null}
        {reservationurl ? <SubItem name="예약" html={reservationurl} /> : null}
        {checkintime ? <SubItem name="체크인" html={checkintime} /> : null}
        {checkouttime ? <SubItem name="체크아웃" html={checkouttime} /> : null}
        {refundregulation ? (
          <SubItem name="환불" html={refundregulation} />
        ) : null}
        {scalelodging ? <SubItem name="규모" html={scalelodging} /> : null}

        {item.info ? (
          Array.isArray(item.info) ? (
            item.info
              .filter((v) => v.infoname)
              .map((v) => (
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

export default TourSleep;
