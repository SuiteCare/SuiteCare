import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import axios from 'axios';

const LoginForm = ({ type }) => {
  const navigator = useRouter();
  const [loginFail, setLoginFail] = useState(false);

  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  async function onSubmitHandler(event) {
    event.preventDefault();
    const role = type === 'mate' ? 'M' : 'F';

    if (loginForm.id && loginForm.password) {
      try {
        let body = {
          login_id: loginForm.id,
          password: loginForm.password,
          role: role,
        };

        const response = await axios.post('/api/v1/login', body);

        const msg = response.headers.get('msg');
        if (response.status === 200 && msg === 'success') {
          // login_id로 검색한 id를 대신 저장할 예정 (재선 작업 후 진행)
          sessionStorage.setItem('login_info', JSON.stringify({ login_id: body.login_id, role: body.role }));
          navigator.push(`/${type}/main`);
        } else if (msg === 'fail') {
          setLoginFail(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('아이디와 비밀번호를 입력해 주세요.');
    }
  }

  return (
    <div className={`${styles.LoginForm} Form`}>
      <div className={styles.loginBox}>
        <form onSubmit={onSubmitHandler}>
          <div className={styles.userBox}>
            <input type='text' placeholder=' 아이디' name='id' value={loginForm.id} onChange={onChangeHandler} />
          </div>
          <div className={styles.userBox}>
            <input
              type='password'
              placeholder='비밀번호'
              name='password'
              value={loginForm.password}
              onChange={onChangeHandler}
            />
          </div>
          {loginFail && (
            <div className={styles.loginMsg}>
              <p>아이디와 비밀번호가 일치하지 않습니다.</p>
            </div>
          )}
          <button className={styles.button} type='submit'>
            로그인
          </button>
          <button className={styles.button} onClick={() => navigator.push(`/${type}/signup`)} type='button'>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
