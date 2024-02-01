import { useEffect } from 'react';
import { useRouter } from 'next/router';

import logout from '@/utils/logout';

const LogoutPage = () => {
  const navigator = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      logout();
      navigator.push('/');
    }
  }, []);
  return <>로그아웃이 완료되었습니다.</>;
};

export default LogoutPage;
