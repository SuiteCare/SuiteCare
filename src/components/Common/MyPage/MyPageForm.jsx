/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import ChangePwModal from './ChangePwModal';
import styles from './MyPageForm.module.css';

const MyPageForm = () => {
  const navigator = useRouter();

  const { token, id, login_id } = useLoginInfo();
  const [tel, setTel] = useState('');

  const { data, isError, isLoading } = useQuery(
    ['mypage', token],
    async () => {
      const response = await axiosInstance.get('/api/v1/mypage', { params: { id } });
      return response.data;
    },
    {
      enabled: Boolean(token),
    },
  );

  useEffect(() => {
    if (data) {
      setTel(data.tel);
    }
  }, [data]);

  const { isModalVisible, openModal, closeModal } = useModal();

  const handlePhoneCertification = (event) => {
    event.preventDefault();

    if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(tel)) {
      alert(`인증 api 연동 필요\n${tel}`);
    } else {
      alert('휴대폰 번호를 올바르게 입력하십시오.');
    }
  };

  const submitModification = useMutation(
    async () => {
      const response = await axiosInstance.patch('/api/v1/member', {
        tel: tel.replaceAll('-', ''),
      });
      console.log(tel, data.tel);
      return response.data;
    },
    {
      onSuccess: ($data) => {
        if ($data) {
          alert('내 정보 수정에 성공하였습니다.');
          navigator.reload();
        } else {
          alert('내 정보 수정에 실패하였습니다.');
        }
      },
    },
  );

  const handleModifyClick = async (e) => {
    e.preventDefault();

    if (tel !== data.tel) {
      submitModification.mutate();
    } else {
      alert('변경된 정보가 없습니다.');
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
          <button type='button' className={styles.change_button} onClick={openModal}>
            비밀번호 변경
          </button>
          {isModalVisible && <ChangePwModal closeModal={closeModal} />}
        </div>

        <div className='input_wrapper'>
          <label>성명</label>
          <input type='text' name='name' id='name' readOnly value={data?.name} />
        </div>

        <div className='input_wrapper'>
          <label>휴대전화</label>
          <div className='input_with_button'>
            <div className={styles.input_phone}>
              <input
                type='text'
                placeholder='010-0000-0000'
                id='tel'
                value={tel}
                maxLength={13}
                onChange={(e) => setTel(e.target.value)}
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
