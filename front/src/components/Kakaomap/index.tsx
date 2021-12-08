import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { DetailPropsItem } from '../../modules/detail';
import { DetailItemInfo } from '../DetailItem/style';
import { Infowindow, IwContentWrapper, Map, MapWrapper } from './style';

declare global {
  interface Window {
    kakao: any;
  }
}

// const { kakao } = window;

const Kakaomap = ({ item }: DetailPropsItem) => {
  const { mapx, mapy, title } = item;
  useEffect(() => {
    console.log('mapx, mapy', mapx, mapy);
    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window?.kakao.maps.load(() => {
        const container = document.querySelector('#map') as HTMLElement;
        const options = {
          center: new window.kakao.maps.LatLng(mapy, mapx),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커 표시
        const markerPosition = new kakao.maps.LatLng(mapy, mapx);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 줌 컨트롤러
        // const zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      {mapx ? (
        <MapWrapper>
          <Infowindow>
            <div>
              <span>{title}</span>
            </div>
            <a
              href={`https://map.kakao.com/link/to/${title},${mapy},${mapx}`}
              target="_blank"
              rel="noreferrer"
            >
              <b>
                길찾기 <ArrowRightOutlined />
              </b>
            </a>
          </Infowindow>
          <Map id="map"></Map>
        </MapWrapper>
      ) : null}
    </>
  );
};
export default Kakaomap;
