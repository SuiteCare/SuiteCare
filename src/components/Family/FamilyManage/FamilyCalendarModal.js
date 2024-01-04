import React from 'react';

import styles from '@/components/Common/Modal/Modal.module.css';
import useModal from '@/hooks/useModal.js';

import { calAge, calTimeDiff, countWeekdays } from '@/utils/calculators.js';

const FamilyCalendarModal = ({ modalData, closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {/* 시작 */}
        {/* `{
          title: '김환자 님 (중풍)',
          mate: '간병인 박간병 님',
          start: '2023-12-21T00:00:00.000Z',
          end: '2023-12-21T08:00:00.000Z',
          color: 'hsl(342, 55%, 50%)',
        }` */}
        {modalData.title}
        {modalData.mate}
        {`${modalData.start}`.split(' ')}
        {`${modalData.end}`.split(' ')}
        {/* 끝 */}
      </div>
    </div>
  );
};

export default FamilyCalendarModal;
