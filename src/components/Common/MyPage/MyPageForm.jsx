import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import ChangePwModal from './ChangePwModal';
import styles from './MyPageForm.module.css';

const MyPageForm = () => {
  const navigator = useRouter();
  const [login_id, setLogin_id] = useState('');
  const [myId, setMyId] = useState();
  const [name, setName] = useState();
  const [tel, setTel] = useState('');
  const loginInfo = JSON.parse(sessionStorage.getItem('login_info'));
  const [role, setRole] = useState(loginInfo.role);

  useEffect(() => {
    const fetchData = async () => {
      if (loginInfo && loginInfo.login_id) {
        setLogin_id(loginInfo.login_id);
        try {
          const response = await axios.get('/api/v1/mypage', {
            params: {
              id: loginInfo.login_id,
            },
          });
          setName(response.data.name);
          setMyId(response.data.login_id);
          setTel(response.data.tel);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert('로그인이 필요합니다.');
      }
    };

    fetchData();
  }, []);

  let part1 = tel.substring(0, 3); // 첫 세 자리
  let part2 = tel.substring(4, 8); // 중간 네 자리
  let part3 = tel.substring(9); // 마지막 네 자리

  //비밀번호 변경 모달
  const [ChangePwModalOn, setChangePwModalOn] = useState(false);

  const closeModal = () => {
    setChangePwModalOn(false);
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

  //휴대폰 번호 인증
  const { phone_1, phone_2, phone_3 } = phoneParts;
  const phoneNumber = `${phone_1}-${phone_2}-${phone_3}`;
  async function handlePhoneCertification(event) {
    event.preventDefault();

    if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber)) {
      alert(`인증 api 연동 필요\n${phoneNumber}`);
    } else {
      alert('휴대폰 번호를 올바르게 입력하십시오.');
    }
  }

  //수정하기 클릭
  async function handleModifyClick(event) {
    event.preventDefault();

    let body = {
      login_id: loginInfo.login_id,
      tel: phoneNumber,
    };

    const response = await axios
      .post('/api/v1/modify', body)
      .then(
        (response) => {
          if (response.data) {
            alert('정보 수정 완료!!!');

            if (role === 'F') {
              navigator.push(`/family/main`);
            } else {
              navigator.push(`/mate/main`);
            }
          } else {
            alert('실패..');
          }
        },
        [role],
      )
      .catch((error) => {
        console.error(error);
      });
  }

  //렌더링 부분
  return (
    <div className={`${styles.MyPageForm} Form_narrow`}>
      <hr />

      <form name='MyPageForm' method='post'>
        <div className='input_wrapper'>
          <label>아이디</label>
          <input type='text' name='id' id='id' readOnly value={myId} />
        </div>

        <div className='input_wrapper'>
          <label>비밀번호</label>

          <div className='input_with_button'>
            <button type='button' className={styles.change_button} onClick={() => setChangePwModalOn(true)}>
              비밀번호 변경
            </button>
          </div>
          {ChangePwModalOn && <ChangePwModal modalData={ChangePwModalOn} closeModal={closeModal} />}
        </div>

        <div className='input_wrapper'>
          <label>성명</label>
          <input type='text' name='name' id='name' readOnly value={name} />
        </div>

        <div className='input_wrapper'>
          <label>휴대전화</label>
          <div className='input_with_button'>
            <div className={styles.input_phone}>
              <input
                type='text'
                placeholder={part1}
                id='phone_1'
                value={phone_1}
                maxLength={3}
                onChange={handlePhoneChange}
              />
              -
              <input
                type='text'
                placeholder={part2}
                id='phone_2'
                value={phone_2}
                maxLength={4}
                onChange={handlePhoneChange}
              />
              -
              <input
                type='text'
                placeholder={part3}
                id='phone_3'
                value={phone_3}
                maxLength={4}
                onChange={handlePhoneChange}
              />
              <input type='hidden' name='phone' value={phoneNumber} />
            </div>
            <button type='button' onClick={handlePhoneCertification}>
              변경/인증
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
