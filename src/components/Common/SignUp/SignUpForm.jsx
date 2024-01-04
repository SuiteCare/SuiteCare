/* eslint-disable camelcase */
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import formInputInfos from './FormInputInfos';

const SignUpForm = ({ type }) => {
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

  // 회원가입 버튼 클릭 시 이동시키는 함수
  const navigator = useRouter();

  const { id, pw, pw_check, user_name } = formInputInfos;

  // 회원구분 부분의 라디오 버튼 클릭 시 페이지를 이동시키는 함수
  const handleRadioClick = () => {
    const url = valueSet(type).radioRedirect;
    const { otherType } = valueSet(type);
    if (window.confirm(`${otherType} 회원가입 페이지로 이동하시겠습니까?\n단, 기존 작성내역은 초기화됩니다.`)) {
      navigator.push(url);
    }
  };

  // 아이디를 state에 저장
  const [idState, setIdState] = useState('');
  const [isAvailableID, setIsAvailableID] = useState(false);

  const onIdChange = ($event) => {
    setIdState($event.target.value);
    setIsAvailableID(false);
  };

  // 아이디 중복확인
  const userIDRegex = /^[a-zA-Z0-9_]{4,16}$/;
  const checkDuplicateID = async () => {
    if (!userIDRegex.test(id.value))
      return alert('아이디는 4글자 이상의 영문 소문자, 숫자, 혹은 밑줄로 구성되어야 합니다.');

    if (idState) {
      try {
        const response = await axios.get('/api/v1/member', { params: { login_id: idState } });
        const { data } = response;

        if (data === 1) {
          alert('이미 사용 중인 아이디입니다.');
          setIsAvailableID(false);
        } else {
          alert('사용 가능한 아이디입니다.');
          setIsAvailableID(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('아이디를 입력하세요.');
      setIsAvailableID(false);
    }
  };

  const [phoneState, setPhoneState] = useState();

  const handlePhoneChange = ($event) => {
    setPhoneState($event.target.value);
  };

  // 휴대폰 번호 인증
  const [isPhoneCertificated, setIsPhoneCertificated] = useState(false);
  async function handlePhoneCertification(event) {
    event.preventDefault();

    if (!/^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/.test(phone.value)) {
      return alert('휴대폰 번호를 올바르게 입력하십시오.');
    }

    alert(`인증 api 연동 필요\n${phone.value}`);

    const body = {
      merchant_uid: '',
      min_age: 14,
      name: user_name.value,
      phone: phone.value,
      carrier: 'MVNO', // SKT, KTF, LGT, MVNO
      company: 'http://localhost:3000',
      m_redirect_url: 'http://localhost:3000/certification',
      popup: true,
    };

    const response = await axios
      .post('/certifications/{imp_uid}', body)
      .then((res) => {
        if (response.data) {
          // alert('인증 완료');
          console.log('200', res);
        } else {
          // alert('인증 실패');
          console.log('401', res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const formInputs = ($typeName) => {
    return (
      <div className='input_wrapper'>
        <label>{formInputInfos[$typeName].label}</label>
        <input
          type={formInputInfos[$typeName].type}
          placeholder={formInputInfos[$typeName].label}
          name={formInputInfos[$typeName].name}
          id={formInputInfos[$typeName].id}
          maxLength={formInputInfos[$typeName].maxLength}
          required
        />
      </div>
    );
  };

  async function handleSignUpClick(event) {
    event.preventDefault();
    const role = type === 'mate' ? 'M' : 'F';

    if (!isAvailableID) return alert('아이디 중복확인이 필요합니다.');
    if (!pw.value) return alert('비밀번호를 입력하세요.');
    if (pw.value !== pw_check.value) return alert('비밀번호가 일치하지 않습니다.');
    if (!user_name.value) return alert('성명을 입력하세요.');
    if (!isPhoneCertificated) return alert('휴대폰 본인인증이 필요합니다.');

    const body = {
      login_id: id.value,
      password: pw.value,
      name: user_name.value,
      tel: phone.value.replaceAll('-', ''),
      role,
    };

    const response = await axios
      .post('/api/v1/member', body)
      .then((res) => {
        if (res.data) {
          alert('회원가입이 완료되었습니다.');
          navigator.push(`/${type}/login`);
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className='Form_narrow'>
      <div className='input_wrapper'>
        <label>회원 구분</label>
        <div className='input_radio'>
          <div className='radio_user_type'>
            <input type='radio' value='family' checked={type === 'family'} onChange={handleRadioClick} />
            <span>패밀리 회원 (간병 서비스 이용자)</span>
          </div>
          <div className='radio_user_type'>
            <input type='radio' value='mate' checked={type === 'mate'} onChange={handleRadioClick} />
            <span>메이트 회원 (간병인)</span>
          </div>
        </div>
      </div>

      <hr />

      <form name='signup' method='post'>
        <div className='input_wrapper'>
          <label>아이디</label>
          <div className='input_with_button'>
            <input type='text' placeholder='아이디' name='id' id='id' maxLength='20' onChange={onIdChange} required />
            <button type='button' onClick={checkDuplicateID}>
              중복확인
            </button>
          </div>
        </div>

        {formInputs('pw')}
        {formInputs('pw_check')}
        {formInputs('user_name')}

        <div className='input_wrapper'>
          <label>휴대전화</label>
          <div className='input_with_button'>
            <div>
              <input
                type='text'
                placeholder='010-0000-0000'
                name='phone'
                id='phone'
                maxLength={13}
                onChange={handlePhoneChange}
                required
              />
            </div>
            <button type='button' onClick={handlePhoneCertification}>
              본인인증
            </button>
          </div>
        </div>

        <hr />

        <div className='button_wrapper'>
          <button onClick={handleSignUpClick}>{valueSet(type).buttonText}</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
