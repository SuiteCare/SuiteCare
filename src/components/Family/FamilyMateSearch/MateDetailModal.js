import styles from '@/components/Common/Modal.module.css';
import React from 'react';
import Image from 'next/image';
import default_profile from '@/assets/default_profile.jpg';

const MateDetailModal = ({ modalData, closeModal }) => {
  const calAge = ($birth) => ~~((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <p onClick={closeModal}>X</p>
        <h2>메이트 상세정보</h2>
        <div>
          {modalData.profile_picture_filename || <Image src={default_profile} alt='profile_picture' />}
          <div>
            <label>{modalData.mate_name}</label>
            <span>{modalData.mate_id}</span>
            <p>
              {modalData.gender === 'F' ? '여성' : '남성'}, 만 {calAge(modalData.birthday)}세
            </p>
          </div>
        </div>
        <p>{modalData.introduction}</p>
        <p>{modalData.address}</p>
        <p>{modalData.main_service}</p>
        <p>{modalData.wage}</p>
        <p>
          {modalData.contact_time_start}~{modalData.contact_time_end}
        </p>
        <p>{modalData.career.map((e) => e.title)}</p>
        <p>{modalData.certificate.map((e) => e.certificate_name)}</p>
      </div>
    </div>
  );
};

export default MateDetailModal;
