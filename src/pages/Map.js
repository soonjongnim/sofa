import React, { useEffect, useRef } from 'react';
import './css/Map.css'; // 스타일 파일 추가

const Map = () => {
  const mapRef = useRef(null);
  // 수원시 영화동 좌표
  const lat = 37.2918498 // 위도 숫자로 넣어주기
  const lng = 127.0195281 // 경도 숫자로 넣어주기
  const { naver } = window;
  useEffect(() => {
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17, // 지도 확대 정도
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT
        }
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);

  return (
    <div className="map-container">
      <h2 className="map-title">
        <span class="uio_title_bullet"></span>
        오시는길
      </h2>
      <div ref={mapRef} className="map"></div>
      <div className="map-info">
        <p className="map-location-title">NO.1 쇼파제작 전문</p>
        <p className="map-address">경기도 수원시 장안구 영화동 116-31</p>
        <p className="map-note">방문상담시 사전약속 후 와주시길 부탁드립니다</p>
      </div>
    </div>
  );
};

export default Map;