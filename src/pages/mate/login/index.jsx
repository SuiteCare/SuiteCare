import React from 'react';

import styles from './login.module.css';
import LoginForm from '@/components/Common/Login/LoginForm';
import MateHeader from '@/components/Mate/MateHeader/MateHeader';

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <MateHeader isCheckLogin={false} />
      <div className='title_wrapper'>
        <h1>메이트 로그인</h1>
        <span>간병 일감을 찾을 수 있는 메이트 회원 로그인 페이지입니다.</span>
      </div>
      <LoginForm type='mate' />
    </div>
  );
};

export default LoginPage;
