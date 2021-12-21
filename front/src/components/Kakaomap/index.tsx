import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { DetailItemprops } from '../../modules/detail';
import { Infowindow, Map, MapWrapper } from './style';

declare global {
  interface Window {
    kakao: any;
  }
}

const Kakaomap: React.FC<DetailItemprops> = ({ item }) => {
  const { mapx, mapy, title } = item;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS}`;
    document.head.appendChild(script);

    const container = document.getElementById('map');
    script.onload = () => {
      window.kakao.maps.load(() => {
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

        // 지도 확대 막기
        map.setZoomable(false);

        // 줌 컨트롤러
        // const zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    };
    return () => script.remove();
  }, [item, mapx, mapy]);

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
