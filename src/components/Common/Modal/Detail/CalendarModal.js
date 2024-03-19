import React, { useState } from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import ReservationDetailTab from './ReservationDetailTab';
import PatientDetailTab from './PatientDetailTab';

const CalendarModal = ({ modalData, closeModal, page }) => {
  const { reservation, patient } = modalData.detail;
  const { handleContentClick } = useModal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        <h2 style={{ textAlign: 'center' }}>
          {modalData.start.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </h2>
        <hr />
        <h3 style={{ border: 'none' }}>
          <span style={{ color: `${modalData.color}` }}>● </span>
          {modalData.title}
        </h3>

        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            간병 정보
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            환자 정보
          </div>
        </div>
        {activeTab === 0 && <ReservationDetailTab modalData={reservation} styles={styles} page={page} />}
        {activeTab === 1 && <PatientDetailTab modalData={patient} styles={styles} />}
      </div>
    </div>
  );
};

export default CalendarModal;
