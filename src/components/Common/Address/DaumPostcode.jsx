import React from 'react';

import useModal from '@/hooks/useModal';

import DaumSearchModal from './DaumSearchModal';

const DaumPostcode = ({ address, setAddress }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  return (
    <div className='DaumPostcode'>
      <input
        type='text'
        id='postcode'
        placeholder='우편번호'
        value={address.postcode}
        onChange={handleInputChange}
        maxLength={5}
        pattern='[0-9]{5}'
      />
      <button type='button' onClick={openModal}>
        우편번호 찾기
      </button>
      <input
        type='text'
        id='roadAddress'
        placeholder='도로명주소'
        value={address.roadAddress}
        onChange={handleInputChange}
      />
      <input
        type='text'
        id='jibunAddress'
        placeholder='지번주소'
        value={address.jibunAddress}
        onChange={handleInputChange}
      />
      <input
        type='text'
        id='detailAddress'
        placeholder='상세주소'
        value={address.detailAddress}
        onChange={handleInputChange}
      />

      {isModalVisible && <DaumSearchModal closeModal={closeModal} setAddress={setAddress} />}
    </div>
  );
};

export default DaumPostcode;
