/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';
import useAlert from '@/hooks/useAlert';

import ChangePwModal from './ChangePwModal';
import styles from './MyPageForm.module.css';

import { genderToKo } from '@/utils/calculators';

const MyPageForm = () => {
  const navigator = useRouter();
  const { openAlert, alertComponent } = useAlert();
  const { isModalVisible, openModal, closeModal } = useModal();
  const { id } = useLoginInfo();

  const [formData, setFormData] = useState({
    gender: '',
    email: '',
    tel: '',
  });

  const [changedData, setChangedData] = useState();

  const { data, isError, isLoading } = useQuery(
    ['mypage', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/mypage', { params: { id } });
      return response.data;
    },
    {
      enabled: Boolean(id),
    },
  );

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleClickGender = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
    setChangedData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setChangedData((prevData) => ({
      ...prevData,
      [id]: id === 'tel' ? value.replaceAll('-', '') : value,
    }));
  };

  // 휴대폰 번호 인증
  const [isPhoneCertificated, setIsPhoneCertificated] = useState(false);
  const handlePhoneCertification = (e) => {
    e.preventDefault();

    if (!/^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/.test(formData.tel)) {
      return openAlert('휴대폰 번호를 올바르게 입력하십시오.');
    }

    if (formData.tel) {
      if (isPhoneCertificated) {
        return openAlert('휴대폰 인증이 완료된 상태입니다.');
      }
      setIsPhoneCertificated(true);
      return openAlert(`휴대폰 인증 api 연동 전 임시 인증 완료`);
    }
  };

  // 이메일 인증
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);
  const handleEmailCertification = (e) => {
    e.preventDefault();

    if (
      !/(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
        formData.email,
      )
    ) {
      return openAlert('이메일 주소를 올바르게 입력하십시오.');
    }

    if (formData.email) {
      if (isEmailCertificated) {
        return openAlert('이메일 인증이 완료된 상태입니다.');
      }
      setIsEmailCertificated(true);
      return openAlert(`이메일 인증 api 연동 전 임시 인증 완료`);
    }
  };

  const submitModification = useMutation(
    async () => {
      const response = await axiosInstance.patch('/api/v1/member', changedData);
      return response.data;
    },
    {
      onSuccess: ($data) => {
        if ($data) {
          openAlert('내 정보 수정에 성공하였습니다.');
          navigator.reload();
        } else {
          openAlert('내 정보 수정에 실패하였습니다.');
        }
      },
    },
  );

  const handleModifyClick = async (e) => {
    e.preventDefault();

    if (formData.tel === data.tel && formData.email === data.email && formData.gender === data.gender) {
      openAlert('변경된 정보가 없습니다.');
    } else if (formData.tel !== data.tel && !isPhoneCertificated) {
      openAlert('휴대폰 인증이 필요합니다.');
    } else if (formData.email !== data.email && !isEmailCertificated) {
      openAlert('이메일 인증이 필요합니다.');
    } else {
      submitModification.mutate();
    }
  };

  return (
    <div className={`${styles.MyPageForm} Form_narrow`}>
      {alertComponent}

      <hr />
      <form name='MyPageForm' method='post'>
        <div className='input_wrapper'>
          <label>아이디</label>
          <input type='text' name='id' id='id' readOnly value={id} />
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
          <label>생년월일</label>
          <input type='text' name='birthday' id='birthday' readOnly value={data?.birthday} />
        </div>

        <div className='input_wrapper'>
          <label>성별</label>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
            <div>
              <input
                type='radio'
                name='gender'
                value='M'
                checked={formData.gender === 'M'}
                onClick={handleClickGender}
              />
              <span>남성</span>
            </div>
            <div>
              <input
                type='radio'
                name='gender'
                value='F'
                checked={formData.gender === 'F'}
                onClick={handleClickGender}
              />
              <span>여성</span>
            </div>
          </div>
        </div>

        <div className='input_wrapper'>
          <label>이메일</label>
          <div className='input_with_button'>
            <input type='text' name='email' id='email' value={formData.email} onChange={(e) => handleInputChange(e)} />
            <button type='button' onClick={handleEmailCertification}>
              재인증
            </button>
          </div>
        </div>

        <div className='input_wrapper'>
          <label>휴대전화</label>
          <div className='input_with_button'>
            <div className={styles.input_phone}>
              <input
                type='text'
                placeholder='010-0000-0000'
                id='tel'
                value={formData.tel}
                maxLength={13}
                onChange={(e) => handleInputChange(e)}
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
