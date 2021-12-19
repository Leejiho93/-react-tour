import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';

const TourSleep = ({ item }: DetailItemprops) => {
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
        {addr1 ? (
          <Li>
            <b>주소</b> <p>{addr1}</p>
          </Li>
        ) : null}
        {homepage ? (
          <Li>
            <b>홈페이지</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: homepage,
              }}
            />
          </Li>
        ) : null}
        {reservationlodging ? (
          <Li>
            <b>문의</b> <p>{reservationlodging}</p>
          </Li>
        ) : null}
        {reservationurl ? (
          <Li>
            <b>예약</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: reservationurl,
              }}
            />
          </Li>
        ) : null}

        {checkintime ? (
          <Li>
            <b>체크인</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: checkintime,
              }}
            />
          </Li>
        ) : null}
        {checkouttime ? (
          <Li>
            <b>체크아웃</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: checkouttime,
              }}
            />
          </Li>
        ) : null}
        {refundregulation ? (
          <Li>
            <b>환불</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: refundregulation,
              }}
            />
          </Li>
        ) : null}
        {scalelodging ? (
          <Li>
            <b>규모</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: scalelodging,
              }}
            />
          </Li>
        ) : null}
        {item.info ? (
          Array.isArray(item.info) ? (
            item.info.map((v) => (
              <Li key={v.infoname}>
                <b>{v.infoname}</b>
                <p
                  dangerouslySetInnerHTML={{
                    __html: v.infotext,
                  }}
                />
              </Li>
            ))
          ) : (
            <Li>
              <b>{item.info.infoname}</b>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.info.infotext,
                }}
              />
            </Li>
          )
        ) : null}
      </ul>
    </IntroWrapper>
  );
};

export default TourSleep;
