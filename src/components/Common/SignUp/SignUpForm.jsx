/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import useAlert from '@/hooks/useAlert';
import axiosInstance from '@/services/axiosInstance';

import formInputInfos from './FormInputInfos';
import styles from './SignUpForm.module.css';

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

        if (data.code === 200) {
          setIsAvailableID(true);
          return openAlert('사용 가능한 아이디입니다.');
        }
      } catch (error) {
        if(error.response.data.code === 409) {
          setIsAvailableID(false);
          return openAlert('이미 사용 중인 아이디입니다.');
        } else {
          setIsAvailableID(false);
          return openAlert('요청을 처리하는 중 오류가 발생했습니다.');
        }
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

  const handleClickGender = (e) => {
    setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (id === 'id') setIsAvailableID(false);
    if (id === 'tel') setIsPhoneCertificated(false);
    if (id === 'email') setIsEmailCertificated(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailableID) return openAlert('아이디 중복확인이 필요합니다.');
    if (!formData.password) return openAlert('비밀번호를 입력하세요.');
    if (formData.password !== formData.pw_check) return openAlert('비밀번호가 일치하지 않습니다.');
    if (!formData.name) return openAlert('성명을 입력하세요.');
    if (!isEmailCertificated) return openAlert('이메일 인증이 필요합니다.');
    if (!isPhoneCertificated) return openAlert('휴대폰 본인인증이 필요합니다.');

    const today = new Date();
    const dateFourteenYearsAgo = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate()).getTime();
    if (new Date(formData.birthday).getTime() > dateFourteenYearsAgo)
      return openAlert('14세 미만은 가입할 수 없습니다.');

    try {
      const role = type === 'mate' ? 'M' : 'F';

      const body = {
        id: formData.id,
        password: formData.password,
        name: formData.name,
        tel: formData.tel.replaceAll('-', ''),
        email: formData.email,
        gender: formData.gender,
        birthday: formData.birthday,
        role,
      };

      const response = await axiosInstance.post('/api/v1/signup', body);
      if (response.data) {
        openAlert('회원가입이 완료되었습니다.');
        setTimeout(() => {
          navigator.push(`/${type}/login`);
        }, 1000);
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

  // 테스트용 코드
  const setRandomValue = (target, value) => {
    setFormData((prevData) => ({ ...prevData, [target]: value }));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '`') {
        const lastNames = [
          '김',
          '이',
          '박',
          '최',
          '정',
          '강',
          '조',
          '윤',
          '장',
          '임',
          '한',
          '오',
          '서',
          '신',
          '권',
          '황',
          '안',
          '송',
          '전',
          '홍',
          '문',
          '손',
          '양',
          '배',
          '백',
          '허',
          '남',
          '심',
          '노',
          '하',
          '곽',
          '성',
          '차',
          '주',
          '우',
          '구',
          '나',
          '민',
          '유',
          '류',
          '진',
          '엄',
          '채',
          '원',
          '천',
          '방',
          '공',
          '현',
          '함',
          '변',
          '염',
          '여',
          '추',
          '도',
          '소',
          '석',
          '마',
          '가',
        ];

        const firstNames = [
          '가영',
          '서연',
          '지우',
          '서현',
          '수빈',
          '주아',
          '서아',
          '지민',
          '하은',
          '서은',
          '시우',
          '예은',
          '유진',
          '수아',
          '수민',
          '유나',
          '시아',
          '시은',
          '현우',
          '은서',
          '지원',
          '민지',
          '지연',
          '예린',
          '지현',
          '민주',
          '은지',
          '다은',
          '주연',
          '현주',
          '지유',
          '소연',
          '세은',
          '윤서',
          '서윤',
          '민서',
          '윤아',
          '소윤',
          '지아',
          '지윤',
          '다현',
          '서진',
          '은채',
          '나윤',
          '정희',
          '영숙',
          '순자',
          '은영',
          '옥순',
          '경숙',
          '영자',
          '영희',
          '순옥',
          '미숙',
          '경자',
          '정숙',
          '미영',
          '미옥',
          '정희',
          '경희',
          '성희',
          '현숙',
          '은숙',
          '철수',
          '영수',
          '민수',
          '기성',
          '영호',
          '종수',
          '성수',
          '재호',
          '승우',
          '우진',
          '성민',
          '현우',
          '주성',
          '민준',
          '재욱',
          '준호',
          '동진',
          '상우',
          '재호',
          '영진',
          '성진',
          '창민',
          '민기',
          '정우',
          '준영',
          '영주',
          '기현',
          '민재',
          '진우',
          '성훈',
          '승민',
          '현준',
          '준혁',
          '영호',
          '영현',
          '성준',
          '동현',
          '상현',
          '진혁',
          '민호',
        ];

        setRandomValue(
          'name',
          lastNames[Math.floor(Math.random() * lastNames.length)] +
            firstNames[Math.floor(Math.random() * firstNames.length)],
        );

        setRandomValue('gender', ['F', 'M'][Math.round(Math.random())]);

        setRandomValue(
          'email',
          `${Math.random().toString(36).substring(2, 10)}@${type}.${
            ['com', 'co.kr', 'net'][Math.floor(Math.random() * 3)]
          }`,
        );
        setRandomValue(
          'tel',
          `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        );

        const randomYear = Math.floor(Math.random() * 80) + 1924;
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomDay = Math.floor(Math.random() * 31) + 1;
        setRandomValue(
          'birthday',
          `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`,
        );
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='Form_narrow'>
      {alertComponent}
      <div className='input_wrapper'>
        <label>회원 구분</label>
        <div className='input_radio'>
          <div className={styles.radio_user_type} onClick={handleRadioClick}>
            <input type='radio' value='family' defaultChecked={type === 'family'} />
            <span>패밀리 회원 (간병 서비스 이용자)</span>
          </div>
          <div className={styles.radio_user_type} onClick={handleRadioClick}>
            <input type='radio' value='mate' defaultChecked={type === 'mate'} />
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
        {formInputs('birthday')}

        <div className='input_wrapper'>
          <label>성별</label>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
            <div>
              <input
                type='radio'
                name='gender'
                value='M'
                defaultChecked={formData.gender === 'M'}
                onClick={handleClickGender}
              />
              <span>남성</span>
            </div>
            <div>
              <input
                type='radio'
                name='gender'
                value='F'
                defaultChecked={formData.gender === 'F'}
                onClick={handleClickGender}
              />
              <span>여성</span>
            </div>
          </div>
        </div>

        <div className='input_with_button'>
          {formInputs('email')}
          <button type='button' onClick={handleEmailCertification}>
            이메일 인증
          </button>
        </div>

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
