import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import logout from '../utils/logout';

const useLoginInfo = () => {
  const navigator = useRouter();

  const [loginInfo, setLoginInfo] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localLoginInfo = JSON.parse(localStorage.getItem('login_info'));
      const accessToken = localStorage.getItem('access_token');
      const expirationTime = localStorage.getItem('expiration_time');
      setLoginInfo({ ...localLoginInfo, token: accessToken, expire: expirationTime });

      if (expirationTime < new Date().getTime()) {
        // expirationTime보다 현재시간이 '나중' 이면
        const { role } = localLoginInfo;
        logout();
        alert('로그인이 필요합니다.');
        navigator.push(`/${role === 'M' ? 'mate' : 'family'}/login`);
      }
    }
  }, []);

  return loginInfo;
};

export default useLoginInfo;
