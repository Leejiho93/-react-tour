import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';

const TourEvent = ({ item }: DetailItemprops) => {
  const { addr1, homepage, tel } = item;
  const { usetimefestival, playtime, discountinfofestival } = item.intro;
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
        {tel ? (
          <Li>
            <b>문의</b> <p>{tel}</p>
          </Li>
        ) : null}
        {usetimefestival ? (
          <Li>
            <b>요금</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: usetimefestival,
              }}
            />
          </Li>
        ) : null}
        {playtime ? (
          <Li>
            <b>일정</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: playtime,
              }}
            />
          </Li>
        ) : null}
        {discountinfofestival ? (
          <Li>
            <b>할인</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: discountinfofestival,
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

export default TourEvent;
