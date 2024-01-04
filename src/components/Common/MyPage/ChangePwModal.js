import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../Modal/Modal.module.css';

const ChangePwModal = ({ modalData, closeModal }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  const [dbPw, setDbPw] = useState();
  const loginInfo = JSON.parse(sessionStorage.getItem('login_info'));

  useEffect(() => {
    const fetchData = async () => {
      if (loginInfo && loginInfo.login_id) {
        try {
          const response = await axios.get('/api/v1/mypage', {
            params: {
              id: loginInfo.login_id,
            },
          });
          setDbPw(response.data.password);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert('로그인이 필요합니다.');
      }
    };
    fetchData();
  }, []);

  const handleChangePwClick = async () => {
    if (dbPw === pw.value) {
      console.log(pw.value);
      if (newPw.value === newPwCheck.value) {
        console.log(newPw.value);
        const body = {
          login_id: loginInfo.login_id,
          password: newPw.value,
        };
        const response = await axios
          .post('/api/v1/changepw', body)
          .then((response) => {
            if (response.data) {
              alert('비밀번호 변경이 완료되었습니다.');
              closeModal();
            } else {
              alert('실패..');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert('입력하신 새 비밀번호가 다릅니다.');
      }
    } else {
      alert('현재 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>

        <div className={styles.info_wrapper}>
          <label>현재 비밀번호</label>
          <input type='password' placeholder='기존 비밀번호 입력' id='pw' />
        </div>
        <div className={styles.info_wrapper}>
          <label>새 비밀번호</label>
          <input type='password' placeholder='새 비밀번호 입력' id='newPw' />
        </div>
        <div className={styles.info_wrapper}>
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
