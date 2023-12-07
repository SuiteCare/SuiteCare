import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './loginForm.module.css';

const LoginForm = ({ type }) => {
  const navigator = useRouter();

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

  const onSubmitHandler = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();
    console.log(loginForm);
    /*
    let body = {
        ID: ID,
        password: Password,
    }
        dispatch(loginUser(body));
*/
  };

  return (
    <div className={styles.LoginForm} id='test'>
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
          <br />
          <button className={styles.button_1} type='submit'>
            로그인
          </button>
          <button className={styles.button_2} onClick={() => navigator(`/${type}/signup`)}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
