import React from 'react';

import DaumPostcode from '@/components/Common/Address/DaumPostcode';
import KakaoPostcode from '@/components/Common/Address/KakaoPostcode';

const AddressPart = ({ styles, formData, handleInputChange, address, setAddress }) => {
  const handleAddressInputChange = (e) => {
    const { id, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  return (
    <div className='input_wrapper'>
      <label>주소</label>
      <div className={styles.address_section}>
        <span>장소 종류</span>
        <select name='location' onChange={handleInputChange}>
          <option value='병원'>병원</option>
          <option value='자택'>자택</option>
        </select>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <span>우편번호</span>
          <span>도로명주소</span>
          <span>지번주소</span>
          <span>상세주소</span>
        </div>
        {formData.location === '병원' ? (
          <KakaoPostcode address={address} setAddress={setAddress} handleInputChange={handleAddressInputChange} />
        ) : (
          <DaumPostcode address={address} setAddress={setAddress} handleInputChange={handleAddressInputChange} />
        )}
      </div>
    </div>
  );
};

export default AddressPart;
