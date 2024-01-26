import { useState, useEffect } from 'react';

const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionLoginInfo = JSON.parse(sessionStorage.getItem('login_info'));
      setLoginInfo(sessionLoginInfo);
    }
  }, []);

  return loginInfo;
};

export default useLoginInfo;
