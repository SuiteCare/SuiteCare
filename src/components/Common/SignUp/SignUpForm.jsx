import { useState } from 'react';
import styles from './SignUpForm.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import formInputInfos from './FormInputInfos';

const SignUpForm = ({ type }) => {
  //type에 따라 변경될 값을 모아 둔 함수
  const valueSet = ($type) => {
    if ($type === 'family') {
      return {
        buttonText: '패밀리 회원가입',
        radioRedirect: '/mate/signup',
        otherType: '메이트 (간병인)',
      };
    } else if ($type === 'mate') {
      return {
        buttonText: '메이트 회원가입',
        radioRedirect: '/family/signup',
        otherType: '패밀리 (간병 서비스 이용자)',
      };
    }
  };

  //회원가입 버튼 클릭 시 이동시키는 함수
  const navigator = useRouter();

  //회원구분 부분의 라디오 버튼 클릭 시 페이지를 이동시키는 함수
  const handleRadioClick = () => {
    const url = valueSet(type).radioRedirect;
    const otherType = valueSet(type).otherType;
    if (window.confirm(otherType + ' 회원가입 페이지로 이동하시겠습니까?\n단, 기존 작성내역은 초기화됩니다.')) {
      navigator.push(url);
    }
  };

  //아이디를 state에 저장
  const [idState, setIdState] = useState('');
  const onIdChange = ($event) => {
    const id = $event.target.value;
    setIdState(id);
  };

  //아이디 중복확인
  const checkDuplicateID = async () => {
    if (idState) {
      try {
        const response = await axios.get('/api/v1/family', { params: { id: idState } });
        const data = response.data;

        if (data === 1) {
          alert('이미 사용 중인 아이디입니다.');
        } else {
          alert('사용 가능한 아이디입니다.');
          document.getElementById('id').readOnly = true;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('ID를 입력하세요.');
    }
  };

  //휴대폰 번호를 작성하고 hidden input에 모으는 파트
  const [phoneParts, setPhoneParts] = useState({
    phone_1: '',
    phone_2: '',
    phone_3: '',
  });

  const handlePhoneChange = ($event) => {
    const { id, value } = $event.target;

    const isValidInput = /^\d{0,4}$/.test(value);

    if (isValidInput) {
      setPhoneParts((prevPhoneParts) => ({
        ...prevPhoneParts,
        [id]: value,
      }));
    } else {
      alert('숫자만 입력할 수 있습니다.');
    }
  };

  const { phone_1, phone_2, phone_3 } = phoneParts;
  const phoneNumber = `${phone_1}-${phone_2}-${phone_3}`;

  //휴대폰 번호 인증
  const authenticatePhone = () => {
    alert(`인증 api 연동 필요\n${Array.from(phoneParts).join('')}`);
  };

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

  async function handleSignUpClick() {
    const role = type === 'mate' ? 'M' : 'F';

    if (document.getElementById('id').readOnly) {
      if (pw.value && pw.value === pw_check.value) {
        if (user_name.value) {
          let body = {
            login_id: id.value,
            password: pw.value,
            name: user_name.value,
            tel: phoneNumber,
            role: role,
          };

          const response = await axios
            .post('/api/v1/family', body)
            .then((response) => {
              if (response.data) {
                alert('회원가입 완료!!!');
                navigator.push(`/${type}/login`);
              } else {
                alert('실패..');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert('성함을 입력해주세요.');
        }
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } else {
      alert('아이디 중복확인을 해주세요');
    }
  }

  //렌더링 부분
  return (
    <div className={`${styles.SignUpForm} Form_narrow`}>
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
            <input type='text' placeholder='아이디' name='id' id='id' maxLength='20' onChange={onIdChange} />
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
            <div className={styles.input_phone}>
              <input
                type='text'
                placeholder='010'
                id='phone_1'
                value={phone_1}
                maxLength={3}
                onChange={handlePhoneChange}
              />
              -
              <input
                type='text'
                placeholder='0000'
                id='phone_2'
                value={phone_2}
                maxLength={4}
                onChange={handlePhoneChange}
              />
              -
              <input
                type='text'
                placeholder='0000'
                id='phone_3'
                value={phone_3}
                maxLength={4}
                onChange={handlePhoneChange}
              />
              <input type='hidden' name='phone' value={phoneNumber} />
            </div>
            <button type='button' onClick={authenticatePhone}>
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
