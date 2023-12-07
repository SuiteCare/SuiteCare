import React from 'react';
import styles from './login.module.css';
import LoginForm from '@/components/Common/Login/LoginForm';
import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <FamilyHeader />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
