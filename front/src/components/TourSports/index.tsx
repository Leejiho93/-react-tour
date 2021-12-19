import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';

const TourSports = ({ item }: DetailItemprops) => {
  const { addr1, homepage } = item;
  const { infocenterleports, reservation, usetimeleports } = item.intro;
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
        {reservation ? (
          <Li>
            <b>예약</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: reservation,
              }}
            />
          </Li>
        ) : null}
        {infocenterleports ? (
          <Li>
            <b>문의</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: infocenterleports,
              }}
            />
          </Li>
        ) : null}
        {usetimeleports ? (
          <Li>
            <b>이용시간</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: usetimeleports,
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

export default TourSports;
