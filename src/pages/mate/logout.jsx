import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Mate/MateHeader/MateHeader';

import logout from '@/utils/logout';

const LogoutPage = () => {
  const navigator = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      logout();
      navigator.push('/');
    }
  }, []);
  return (
    <>
      <Header />
      <div className='content_wrapper'>로그아웃 처리 중...</div>
    </>
  );
};

export default LogoutPage;
