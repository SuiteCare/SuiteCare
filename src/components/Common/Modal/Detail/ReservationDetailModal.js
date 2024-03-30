import React, { useState } from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import ReservationDetailTab from './ReservationDetailTab';
import PatientDetailTab from './PatientDetailTab';

const ReservationDetailModal = ({ modalData, closeModal, handleMateDetailButton, page }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>

        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            간병 정보
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            환자 정보
          </div>
        </div>

        {activeTab === 0 && (
          <ReservationDetailTab
            styles={styles}
            modalData={modalData}
            handleMateDetailButton={handleMateDetailButton}
            page={page}
          />
        )}
        {activeTab === 1 && <PatientDetailTab styles={styles} modalData={modalData} />}
      </div>
    </div>
  );
};

export default ReservationDetailModal;
