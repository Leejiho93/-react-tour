import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';

const TourMall = ({ item }: DetailItemprops) => {
  const { addr1, homepage } = item;
  const { infocentershopping, shopguide, opentime, restdateshopping } =
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
        {infocentershopping ? (
          <Li>
            <b>문의</b> <p>{infocentershopping}</p>
          </Li>
        ) : null}
        {shopguide ? (
          <Li>
            <b>안내</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: shopguide,
              }}
            />
          </Li>
        ) : null}
        {restdateshopping ? (
          <Li>
            <b>휴일</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: restdateshopping,
              }}
            />
          </Li>
        ) : null}
        {opentime ? (
          <Li>
            <b>이용시간</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: opentime,
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

export default TourMall;
