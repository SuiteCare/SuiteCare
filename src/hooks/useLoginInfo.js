import { useState, useEffect } from 'react';

const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localLoginInfo = JSON.parse(localStorage.getItem('login_info'));
      const accessToken = localStorage.getItem('access_token');
      setLoginInfo({ ...localLoginInfo, token: accessToken });
    }
  }, []);

  return loginInfo;
};

export default useLoginInfo;
