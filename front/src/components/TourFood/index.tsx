import React from 'react';
import { DetailItemprops } from '../../modules/detail';
import { IntroWrapper, Li } from '../TourSpot/style';
// import { DetailPropsItem, TourFoodProps } from '../../modules/detail';

const TourFood = ({ item }: DetailItemprops) => {
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
        {infocenterfood ? (
          <Li>
            <b>문의</b> <p>{infocenterfood}</p>
          </Li>
        ) : null}
        {treatmenu ? (
          <Li>
            <b>메뉴</b> <p>{treatmenu}</p>
          </Li>
        ) : null}
        {reservationfood ? (
          <Li>
            <b>예약</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: reservationfood,
              }}
            />
          </Li>
        ) : null}
        {restdatefood ? (
          <Li>
            <b>휴일</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: restdatefood,
              }}
            />
          </Li>
        ) : null}
        {opentimefood ? (
          <Li>
            <b>이용시간</b>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: opentimefood,
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

export default TourFood;
