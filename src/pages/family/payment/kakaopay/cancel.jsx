import React, { useEffect } from 'react';

const KakaopayCancel = () => {
  useEffect(() => {
    alert('결제가 취소되었습니다.');
    window.close();
  }, []);
  return <div />;
};

export default KakaopayCancel;
