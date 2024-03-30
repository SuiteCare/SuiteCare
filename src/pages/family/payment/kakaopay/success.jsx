import React, { useEffect } from 'react';

const KakaopaySuccess = () => {
  useEffect(() => {
    alert('결제가 완료되었습니다.');
    window.close();
  }, []);
  return <div />;
};

export default KakaopaySuccess;
