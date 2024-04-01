import React, { useEffect, useState } from 'react';

import useModal from '@/hooks/useModal.js';

import styles from '@/components/Common/Modal/Modal.module.css';
import mapstyles from './kakaomap.module.css';

const KakaoMapModal = ({ setAddress, closeModal }) => {
  const { handleContentClick } = useModal();

  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);

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

  const displayInfowindow = (marker, title) => {
    infowindow.setContent(`<div class=${mapstyles.info_window_content}>${title}</div>`);
    infowindow.open(map, marker);

    const currentPosition = marker.getPosition();
    const newCenter = new window.kakao.maps.LatLng(currentPosition.getLat(), currentPosition.getLng() - 0.002);

    map.panTo(newCenter);
  };

  const addMarker = (position, idx, title) => {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new window.kakao.maps.Size(36, 37);

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
      repeat: 'no-repeat', // 이미지를 반복하지 않도록 설정
    });
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    markers.push(marker);

    // 마커 클릭 시 인포윈도우 표시
    window.kakao.maps.event.addListener(marker, 'click', () => {
      displayInfowindow(marker, title);
    });

    return marker;
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = places.map((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index, place);

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
        pageLink.classList.add(mapstyles.on);
      } else {
        pageLink.addEventListener('click', () => {
          pagination.gotoPage(i);
        });
      }

      fragment.appendChild(pageLink);
    }

    paginationEl.appendChild(fragment);
  };

  // 검색 결과 항목 클릭 시 지도 이동하는 함수
  const handlePlaceClick = (place) => {
    const selectedMarker = markers.find((markerInfo, index) => index === place.index);
    if (selectedMarker) {
      displayInfowindow(selectedMarker, place.place_name);
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setMarkers([]);
      setPlaces(data);
      displayPlaces(data);
      setPagination(pagination);
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const searchPlaces = () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      alert('병원 이름을 입력하세요.');
      return;
    }

    const placesService = new window.kakao.maps.services.Places();
    placesService.keywordSearch(trimmedKeyword, placesSearchCB);
  };

  const getDetailAddress = async ($address) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.addressSearch($address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0].road_address);
        } else {
          console.error('우편번호 검색 실패');
          reject('우편번호 검색 실패');
        }
      });
    });
  };

  const handleSelectButtonClick = async (place) => {
    const { place_name, address_name, road_address_name } = place;

    try {
      const { zone_no, building_name } = await getDetailAddress(address_name || road_address_name);

      setAddress({
        postcode: zone_no,
        jibunAddress: address_name,
        roadAddress: road_address_name,
        detailAddress: `${building_name} (${place_name}) `,
      });
      closeModal();
    } catch (error) {
      console.error('우편번호 검색 실패', error);
      alert('주소 찾기에 실패했습니다.');
    }
  };

  return (
    <div className={`${styles.Modal} ${mapstyles.Modal}`} onClick={closeModal}>
      <div className={`${styles.modal_wrapper} ${mapstyles.modal_wrapper}`} onClick={handleContentClick}>
        <div className={mapstyles.map_wrap}>
          <div id='map' style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }} />

          <div id='menu_wrap' className={`${mapstyles.bg_white} ${mapstyles.menu_wrap}`}>
            <div className={mapstyles.option}>
              <h4>병원 찾기</h4>
              <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    searchPlaces();
                  }
                }}
                id='keyword'
              />
              <button type='button' onClick={searchPlaces}>
                검색
              </button>
            </div>
            <hr />
            {/* 검색 결과를 표시하는 부분 */}
            <ul>
              {places.map((place, index) => (
                <li key={place.id}>
                  <div onClick={() => handlePlaceClick({ ...place, index })}>
                    <span className={`${mapstyles.markerbg} ${mapstyles[`marker_${index + 1}`]}`} />
                    <div className={mapstyles.info}>
                      <h6>{place.place_name}</h6>
                      {place.road_address_name ? (
                        <span>{place.road_address_name}</span>
                      ) : (
                        <span>{place.address_name}</span>
                      )}
                      <p className={mapstyles.tel}>📞{place.phone || '정보 없음'}</p>
                    </div>
                    <button
                      type='button'
                      className={mapstyles.selectBtn}
                      onClick={() => handleSelectButtonClick(place)}
                    >
                      선택
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div id='pagination' className={mapstyles.pagination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoMapModal;
