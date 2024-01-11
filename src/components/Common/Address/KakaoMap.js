import { useState } from 'react';

import useModal from '@/hooks/useModal.js';

import KakaoMapModal from './kakaoMapModal';

const KaKaoMapModal = () => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [address, setAddress] = useState();

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <input type='text' value={address} onChange={handleInputChange} />
      <button type='button' onClick={openModal}>
        병원주소 검색
      </button>
      {isModalVisible && <KakaoMapModal address={setAddress} closeModal={closeModal} />}
    </>
  );
};

export default KaKaoMapModal;
