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

  async function onSubmitHandler(event)  {
      // 버튼만 누르면 리로드 되는것을 막아줌
      event.preventDefault();
      const role = type === "mate" ? "M" : "F";

      if(loginForm.id && loginForm.password) {
          let body = {
            suite_family_id: loginForm.id,
            password: loginForm.password,
            role: role
          };

          const response = await axios.post("/api/v1/login", body)
              .then((response) => {
                const msg = response.headers.get("msg");
                if(response.status === 200 && msg === "success") {
                // session 로그인 상태 추가해야함!
                  navigator.push(`/${type}/main`);
                } else if(msg === "fail") {
                  setLoginFail(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
      } else {
        alert("아이디와 비밀번호를 입력해주세요!!!");
      }

  };

  return (
    <div className={`${styles.LoginForm} Form`}>
      <div className={styles.loginBox}>
        <h1> 로그인 </h1>
        <form onSubmit={onSubmitHandler}>
          <div className={styles.userBox}>
            <input type='text' placeholder=' 아이디' name='id' value={loginForm.id} onChange={onChangeHandler} />
          </div>
          <div className={styles.userBox}>
            <input
              type='password'
              placeholder=' 비밀번호'
              name='password'
              value={loginForm.password}
              onChange={onChangeHandler}
            />
          </div>
          {loginFail && <div className={styles.loginMsg}><p>아이디와 비밀번호가 일치하지 않습니다.</p></div>}
          <br />
          <button className={styles.button_1} type='submit'>
            로그인
          </button>
          <button className={styles.button_2} onClick={() => navigator.push(`/${type}/signup`)} type='button'>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
