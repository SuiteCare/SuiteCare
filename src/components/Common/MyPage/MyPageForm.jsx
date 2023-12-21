import { use, useEffect, useState } from 'react';
import styles from './MyPageForm.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChangePwModal from './ChangePwModal';

const MyPageForm = ({ type }) => {
  const navigator = useRouter();

  const [login_id, setLogin_id] = useState();

  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem('login_info'));
    setLogin_id(loginInfo.login_id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const login_id = '1';
      console.log(login_id);

      if (login_id) {
        try {
          const response = await axios.get('/api/v1/mypage', {
            params: {
              id: login_id,
            },
          });
          console.log('번호:' + response.data.tel);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert('로그인이 필요합니다.');
      }
    };

    fetchData();
  }, [login_id]);

  //비밀번호 변경 모달
  const [ChangePwModalOn, setChangePwModalOn] = useState(false);
  const [modalData, setModalData] = useState({});

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

  const { phone_1, phone_2, phone_3 } = phoneParts;
  const phoneNumber = `${phone_1}-${phone_2}-${phone_3}`;

  //휴대폰 번호 인증
  const authenticatePhone = () => {
    alert(`인증 api 연동 필요\n${Array.from(phoneParts).join('')}`);
  };

  //수정하기 클릭
  async function handleModifyClick(event) {
    event.preventDefault();

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
          alert('정보 수정 완료!!!');
          navigator.push(`/${type}/main`);
        } else {
          alert('실패..');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //렌더링 부분
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

          <div className='input_with_button'>
            <button type='button' className={styles.change_button} onClick={() => setChangePwModalOn(true)}>
              비밀번호 변경
            </button>
          </div>
          {ChangePwModalOn && <ChangePwModal modalData={ChangePwModalOn} closeModal={closeModal} />}
        </div>

        <div className='input_wrapper'>
          <label>성함</label>
          <input type='text' name='name' id='name' readOnly value={login_id} />
        </div>

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
              변경/인증
            </button>
          </div>
        </div>

        <hr />

        <div className='button_wrapper'>
          <button onClick={handleModifyClick}>수정하기</button>
        </div>
      </form>
    </div>
  );
};

export default MyPageForm;
