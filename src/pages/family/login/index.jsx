import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './login.module.css';
import LoginForm from '@/components/Common/Login/LoginForm';
import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';

const LoginPage = () => {
  const navigavor = useRouter();
  const { id } = useLoginInfo();

  useEffect(() => {
    if (id) {
      navigavor.push('/family/main');
    }
  }, [id]);

  return (
    <div className={styles.login}>
      <FamilyHeader isCheckLogin={false} />
      <div className='title_wrapper'>
        <h1>패밀리 로그인</h1>
        <span>간병 서비스를 신청할 수 있는 패밀리 회원 로그인 페이지입니다.</span>
      </div>
      <LoginForm type='family' />
    </div>
  );
};

export default LoginPage;
