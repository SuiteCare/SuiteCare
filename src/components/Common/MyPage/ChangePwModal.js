import React from 'react';
import styles from '@/components/Common/Modal.module.css';

const ChangePwModal = ({ modalData, closeModal }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal}></span>
        </div>

        <div className={styles.info_wrapper}>
          <label>현재 비밀번호</label>
          <input type='password' placeholder='기존 비밀번호 입력' />
        </div>
        <div className={styles.info_wrapper}>
          <label>새 비밀번호</label>
          <input type='password' placeholder='새 비밀번호 입력' />
        </div>
        <div className={styles.info_wrapper}>
          <label>새 비밀번호 확인</label>
          <input type='password' placeholder='새 비밀번호 확인' />
        </div>
        <div className={styles.button_wrapper}>
          <button>비밀번호 변경하기</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePwModal;
