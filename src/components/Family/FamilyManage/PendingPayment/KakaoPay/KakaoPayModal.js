import React from 'react';

import styles from '../../../../Common/Modal/Modal.module.css';
import PaymentPrepare from './PaymentPrepare';

const KakaoPayModal = ({ modalData, closeModal }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.modal_wrapper}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        <PaymentPrepare modalData={modalData} />
        <div className='button_wrapper' />
      </div>
    </div>
  );
};

export default KakaoPayModal;
