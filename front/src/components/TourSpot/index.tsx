import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from './style';

const TourSpot = ({ item }: DetailItemprops) => {
  const { addr1, homepage } = item;
  const { infocenter, usetime } = item.intro;
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
        {infocenter ? (
          <Li>
            <b>문의</b> <p>{infocenter}</p>
          </Li>
        ) : null}
        {usetime ? (
          <Li>
            <b>이용시간 </b>
            <p
              dangerouslySetInnerHTML={{
                __html: usetime,
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

export default TourSpot;
