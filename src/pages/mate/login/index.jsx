import React from 'react';
import styles from './login.module.css';
import LoginForm from '@/components/Common/Login/LoginForm';
import Header from '@/components/Mate/MateHeader/MateHeader';

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <Header />
      <LoginForm type='mate' />
    </div>
  );
};

export default LoginPage;
