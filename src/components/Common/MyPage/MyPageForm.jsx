/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

import ChangePwModal from './ChangePwModal';
import styles from './MyPageForm.module.css';

const MyPageForm = () => {
  const navigator = useRouter();

  const { token, id, login_id } = useLoginInfo();

  const [myData, setMyData] = useState({
    name: '',
    tel: '',
    role: '',
  });

  const { data, isError, isLoading } = useQuery(
    ['mypage', token],
    async () => {
      const response = await axiosInstance.get('/api/v1/mypage', { params: { id } });
      setMyData(response.data);
      return response.data;
    },
    {
      enabled: Boolean(token),
    },
  );

  const [changePwModalOn, setChangePwModalOn] = useState(false);

  const closeModal = () => {
    setChangePwModalOn(false);
  };

  const handlePhoneCertification = (event) => {
    event.preventDefault();

    if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(myData.tel)) {
      alert(`인증 api 연동 필요\n${myData.tel}`);
    } else {
      alert('휴대폰 번호를 올바르게 입력하십시오.');
    }
  };

  const handleModifyClick = async (event) => {
    event.preventDefault();

    const body = {
      login_id,
      tel: myData.tel.replaceAll('-', ''),
    };

    try {
      const response = await axios.post('/api/v1/modify', body);
      if (response.data) {
        alert('정보 수정 완료!!!');

        if (myData?.role === 'F') {
          navigator.push(`/family/main`);
        } else {
          navigator.push(`/mate/main`);
        }
      } else {
        alert('실패..');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.MyPageForm} Form_narrow`}>
      <hr />
      <form name='MyPageForm' method='post'>
        <div className='input_wrapper'>
          <label>아이디</label>
          <input type='text' name='id' id='id' readOnly value={login_id} />
        </div>

        <div className='input_wrapper'>
          <label>비밀번호</label>
          <button type='button' className={styles.change_button} onClick={() => setChangePwModalOn(true)}>
            비밀번호 변경
          </button>
          {changePwModalOn && <ChangePwModal modalData={changePwModalOn} closeModal={closeModal} />}
        </div>

        <div className='input_wrapper'>
          <label>성명</label>
          <input type='text' name='name' id='name' readOnly value={myData.name} />
        </div>

        <div className='input_wrapper'>
          <label>휴대전화</label>
          <div className='input_with_button'>
            <div className={styles.input_phone}>
              <input
                type='text'
                placeholder='010-0000-0000'
                id='tel'
                value={myData.tel}
                maxLength={13}
                onChange={(e) =>
                  setMyData((prevData) => ({
                    ...prevData,
                    tel: e.target.value,
                  }))
                }
              />
            </div>
            <button type='button' onClick={handlePhoneCertification}>
              재인증
            </button>
          </div>
        </div>

        <hr />

        <div className='button_wrapper'>
          <button type='button' onClick={handleModifyClick}>
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPageForm;
