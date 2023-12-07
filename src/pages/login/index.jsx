import React from 'react';
import styles from './login.module.css';
import LoginForm from '@/components/Login/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
