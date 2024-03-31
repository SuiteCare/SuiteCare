import React from 'react';

import useModal from '@/hooks/useModal';
import useAlert from '@/hooks/useAlert';

import KaKaoMapModal from './KakaoMapModal';

const KakaoPostcode = ({ address, setAddress, handleInputChange }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { openAlert, alertComponent } = useAlert();

  return (
    <div className='KakaoPostcode'>
      {openAlert && alertComponent}
      <input
        type='text'
        id='postcode'
        placeholder='우편번호'
        value={address.postcode}
        onChange={handleInputChange}
        maxLength={5}
        pattern='[0-9]{5}'
        disabled
      />
      <button type='button' onClick={openModal}>
        병원주소 찾기
      </button>
      <input
        type='text'
        id='roadAddress'
        placeholder='도로명주소'
        value={address.roadAddress}
        onChange={handleInputChange}
        disabled
      />
      <input
        type='text'
        id='jibunAddress'
        placeholder='지번주소'
        value={address.jibunAddress}
        onChange={handleInputChange}
        disabled
      />
      <input
        type='text'
        id='detailAddress'
        placeholder='상세주소'
        value={address.detailAddress}
        onChange={handleInputChange}
      />

      {isModalVisible && <KaKaoMapModal closeModal={closeModal} setAddress={setAddress} />}
    </div>
  );
};

export default KakaoPostcode;
