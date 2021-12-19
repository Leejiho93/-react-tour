import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';

const TourCulture = ({ item }: DetailItemprops) => {
  const { addr1, homepage } = item;
  const { infocenterculture, parkingculture, parkingfee, usetimeculture } =
    item.intro;
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
        {infocenterculture ? (
          <Li>
            <b>문의</b> <p>{infocenterculture}</p>
          </Li>
        ) : null}
        {parkingculture ? (
          <Li>
            <b>주차</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: parkingculture,
              }}
            />
          </Li>
        ) : null}
        {parkingfee ? (
          <Li>
            <b>요금</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: parkingfee,
              }}
            />
          </Li>
        ) : null}
        {usetimeculture ? (
          <Li>
            <b>이용시간</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: usetimeculture,
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

export default TourCulture;
