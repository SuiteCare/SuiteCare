import styles from '../Modal/Modal.module.css';
import axiosInstance from "@/services/axiosInstance";

const ChangePwModal = ({ closeModal }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleChangePwClick = async () => {
    if (newPw.value === newPwCheck.value) {
      const body = {
        originPassword: pw.value,
        newPassword: newPw.value,
        newPasswordCheck: newPwCheck.value,
      };

      try {
      const response = await axiosInstance.post('/api/v1/changepassword', body)
        if (response.data === 0) {
          alert('현재 비밀번호를 다시 확인해주세요.');
        } else {
          alert('비밀번호 변경이 완료되었습니다.');
          closeModal();
        }
      } catch(error) {
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
          <input type='password' placeholder='기존 비밀번호 입력' id='pw' />
        </div>
        <div className='input_wrapper'>
          <label>새 비밀번호</label>
          <input type='password' placeholder='새 비밀번호 입력' id='newPw' />
        </div>
        <div className='input_wrapper'>
          <label>새 비밀번호 확인</label>
          <input type='password' placeholder='새 비밀번호 확인' id='newPwCheck' />
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
