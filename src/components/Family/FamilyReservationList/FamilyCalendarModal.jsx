import styles from '@/components/Common/Modal.module.css';
import React from 'react';
import { calAge, calTimeDiff, countWeekdays } from '@/assets/util.js';

const FamilyCalendarModal = ({ modalData, closeModal }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal}></span>
        </div>
        {/* 시작 */}
        {modalData}
        {/* 끝 */}
      </div>
    </div>
  );
};

export default FamilyCalendarModal;
