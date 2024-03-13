import React from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

import { calAge, calTimeDiff, countWeekdays } from '@/utils/calculators.js';

const MateCalendarModal = ({ modalData, closeModal }) => {
  console.log(modalData);
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {modalData.title}
        {modalData.family}
        {modalData.start}
        {modalData.end}
      </div>
    </div>
  );
};

export default MateCalendarModal;
