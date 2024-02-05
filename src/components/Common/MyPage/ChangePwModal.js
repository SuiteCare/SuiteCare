import { useState } from 'react';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from '../Modal/Modal.module.css';

const ChangePwModal = ({ closeModal }) => {
  const { handleContentClick } = useModal();
  const { id } = useLoginInfo();

  const [formData, setFormData] = useState({
    pw: '',
    newPw: '',
    newPwCheck: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangePwClick = async () => {
    const { pw, newPw, newPwCheck } = formData;

    if (newPw === newPwCheck) {
      const body = {
        login_id: id,
        originPassword: pw,
        newPassword: newPw,
        newPasswordCheck: newPwCheck,
      };

      try {
        const response = await axiosInstance.post('/api/v1/changepw', body);
        if (response.data === 0) {
          alert('현재 비밀번호를 다시 확인해주세요.');
        } else {
          alert('비밀번호 변경이 완료되었습니다.');
          closeModal();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('입력하신 새 비밀번호가 다릅니다.');
    }
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>

        <div className='input_wrapper'>
          <label>현재 비밀번호</label>
          <input
            type='password'
            placeholder='기존 비밀번호 입력'
            name='pw'
            value={formData.pw}
            onChange={handleChange}
          />
        </div>
        <div className='input_wrapper'>
          <label>새 비밀번호</label>
          <input
            type='password'
            placeholder='새 비밀번호 입력'
            name='newPw'
            value={formData.newPw}
            onChange={handleChange}
          />
        </div>
        <div className='input_wrapper'>
          <label>새 비밀번호 확인</label>
          <input
            type='password'
            placeholder='새 비밀번호 확인'
            name='newPwCheck'
            value={formData.newPwCheck}
            onChange={handleChange}
          />
        </div>
        <div className={styles.button_wrapper}>
          <button type='button' onClick={handleChangePwClick}>
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePwModal;
