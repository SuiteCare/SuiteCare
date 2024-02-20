/* eslint-disable camelcase */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import useAlert from '@/hooks/useAlert';
import axiosInstance from '@/services/axiosInstance';

import formInputInfos from './FormInputInfos';
import styles from './SignUpForm.module.css';

import { emailRegex } from '@/utils/regex';

const SignUpForm = ({ type }) => {
  const navigator = useRouter();
  const { openAlert, alertComponent } = useAlert();

  // type에 따라 변경될 값을 모아 둔 함수
  const valueSet = ($type) => {
    if ($type === 'family') {
      return {
        buttonText: '패밀리 회원가입',
        radioRedirect: '/mate/signup',
        otherType: '메이트 (간병인)',
      };
    }
    if ($type === 'mate') {
      return {
        buttonText: '메이트 회원가입',
        radioRedirect: '/family/signup',
        otherType: '패밀리 (간병 서비스 이용자)',
      };
    }
  };

  // 회원구분 부분의 라디오 버튼 클릭 시 페이지를 이동시키는 함수
  const handleRadioClick = () => {
    const url = valueSet(type).radioRedirect;
    const { otherType } = valueSet(type);
    if (window.confirm(`${otherType} 회원가입 페이지로 이동하시겠습니까?\n단, 기존 작성내역은 초기화됩니다.`)) {
      navigator.push(url);
    }
  };

  // form 데이터를 state에 저장
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    pw_check: '',
    name: '',
    tel: '',
    email: '',
  });

  // 아이디 중복확인
  const [isAvailableID, setIsAvailableID] = useState(false);
  const checkDuplicateIDMutation = useMutation((id) => axiosInstance.get(`/api/v1/check/id`, { params: { id } }));

  const checkDuplicateID = async () => {
    const userIDRegex = /^[a-zA-Z0-9_]{4,16}$/;

    if (!userIDRegex.test(formData.id))
      return openAlert('아이디는 4글자 이상의 영문, 숫자, 혹은 밑줄 (_)로 구성되어야 합니다.');

    if (formData.id) {
      try {
        const response = await checkDuplicateIDMutation.mutateAsync(formData.id);
        const { data } = response;

        if (data !== 0) {
          setIsAvailableID(false);
          return openAlert('이미 사용 중인 아이디입니다.');
        }
        setIsAvailableID(true);
        return openAlert('사용 가능한 아이디입니다.');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setIsAvailableID(false);
      return openAlert('아이디를 입력하세요.');
    }
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
      return openAlert(`인증 api 연동 전 임시 인증 완료`);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (id === 'id') setIsAvailableID(false);
    if (id === 'tel') setIsPhoneCertificated(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailableID) return openAlert('아이디 중복확인이 필요합니다.');
    if (!formData.password) return openAlert('비밀번호를 입력하세요.');
    if (formData.password !== formData.pw_check) return openAlert('비밀번호가 일치하지 않습니다.');
    if (!formData.name) return openAlert('성명을 입력하세요.');
    if (!emailRegex(formData.email)) return openAlert('이메일을 입력하세요.');
    if (!isPhoneCertificated) return openAlert('휴대폰 본인인증이 필요합니다.');

    try {
      const role = type === 'mate' ? 'M' : 'F';

      const body = {
        id: formData.id,
        password: formData.password,
        name: formData.name,
        tel: formData.tel.replaceAll('-', ''),
        email: formData.email,
        role,
      };

      const response = await axiosInstance.post('/api/v1/signup', body);
      if (response.data) {
        openAlert('회원가입이 완료되었습니다.');
        navigator.push(`/${type}/login`);
      } else {
        openAlert('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formInputs = ($typeName) => {
    const infoObj = formInputInfos[$typeName];

    return (
      <div className='input_wrapper'>
        <label>{infoObj.label}</label>
        <input
          type={infoObj.type}
          placeholder={infoObj.placeholder || infoObj.label}
          name={infoObj.name}
          id={infoObj.id}
          maxLength={infoObj.maxLength}
          value={formData[infoObj.id]}
          onChange={handleInputChange}
          required
        />
      </div>
    );
  };

  return (
    <div className='Form_narrow'>
      {alertComponent}
      <div className='input_wrapper'>
        <label>회원 구분</label>
        <div className='input_radio'>
          <div className={styles.radio_user_type} onClick={handleRadioClick}>
            <input type='radio' value='family' checked={type === 'family'} />
            <span>패밀리 회원 (간병 서비스 이용자)</span>
          </div>
          <div className={styles.radio_user_type} onClick={handleRadioClick}>
            <input type='radio' value='mate' checked={type === 'mate'} />
            <span>메이트 회원 (간병인)</span>
          </div>
        </div>
      </div>
      <hr />
      <form name='signup' method='post' onSubmit={handleSignupSubmit}>
        <div className='input_with_button'>
          {formInputs('id')}
          <button type='button' onClick={checkDuplicateID}>
            중복확인
          </button>
        </div>

        {formInputs('password')}
        {formInputs('pw_check')}
        {formInputs('name')}
        {formInputs('email')}

        <div className='input_with_button'>
          {formInputs('tel')}
          <button type='button' onClick={handlePhoneCertification}>
            본인인증
          </button>
        </div>

        <hr />

        <div className='button_wrapper'>
          <button type='submit'>{valueSet(type).buttonText}</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
