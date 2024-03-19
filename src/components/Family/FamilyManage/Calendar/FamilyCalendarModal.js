import React, { useState } from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import ModalReservationTab from './ModalReservationTab';
import ModalPatientTab from './ModalPatientTab';
import calendarModalStyles from './FamilyCalendarModal.module.css';

const FamilyCalendarModal = ({ modalData, closeModal }) => {
  const [activeTab, setActiveTab] = useState(0);

  const { handleContentClick } = useModal();

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
        <h3 style={{ borderColor: `${modalData.color}` }}>{modalData.title}</h3>

        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            간병 정보
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            환자 정보
          </div>
        </div>
        {activeTab === 0 && <ModalReservationTab modalData={modalData} styles={calendarModalStyles} />}
        {activeTab === 1 && <ModalPatientTab modalData={modalData} styles={calendarModalStyles} />}

        <div className='button_wrapper' />
      </div>
    </div>
  );
};

export default FamilyCalendarModal;
