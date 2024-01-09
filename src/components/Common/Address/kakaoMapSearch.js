import React, { useEffect, useState } from 'react';

import mapstyles from './kakaomap.module.css';

const KakaoMapSearch = () => {
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_DEVS_JS_KEY}&libraries=services&autoload=false`;
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, options);
        setMap(newMap);
        setInfowindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const searchPlaces = () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      alert('병원 이름을 입력하세요.');
      return;
    }

    const placesService = new window.kakao.maps.services.Places();
    placesService.keywordSearch(trimmedKeyword, placesSearchCB);
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setMarkers([]);
      displayPlaces(data);
      setPagination(pagination);
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = places.map((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: placePosition,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        displayInfowindow(marker, place.place_name);
      });

      bounds.extend(placePosition);
      return marker; // 새로운 마커 반환
    });

    newMarkers.forEach((marker) => {
      marker.setMap(map); // 생성한 마커를 지도에 추가합니다.
    });

    setMarkers(newMarkers); // 마커 업데이트
    map.setBounds(bounds); // 지도의 영역을 새로운 경계로 설정합니다.
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지번호를 삭제합니다
    paginationEl.innerHTML = '';

    for (let i = 1; i <= pagination.last; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;

      if (i === pagination.current) {
        pageLink.classList.add('on');
      } else {
        pageLink.addEventListener('click', () => {
          pagination.gotoPage(i);
        });
      }

      fragment.appendChild(pageLink);
    }

    paginationEl.appendChild(fragment);
  };

  const displayInfowindow = (marker, title) => {
    infowindow.setContent(`<div class=${mapstyles.info_window_content}>${title}</div>`);
    infowindow.open(map, marker);
  };

  return (
    <div className={mapstyles.map_wrap}>
      <div id='map' style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }} />

      <div id='menu_wrap' className={`${mapstyles.bg_white} ${mapstyles.menu_wrap}`}>
        <div className={mapstyles.option}>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchPlaces();
              }}
            >
              <h4>병원 찾기</h4>
              <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                id='keyword'
                size='15'
              />{' '}
              <button type='submit'>검색</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id='placesList' className={mapstyles.placesList} />
        <div id='pagination' className={mapstyles.pagination} />
      </div>
    </div>
  );
};

export default KakaoMapSearch;
