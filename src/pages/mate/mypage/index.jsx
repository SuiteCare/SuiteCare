import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Mate/MateHeader/MateHeader';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const MateMyPageIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./mypage/resume');
  }, []);

  return (
    <div>
      <Header />
      <div className='page_with_sidebar'>
        <MateMyPageSidebar />
      </div>
    </div>
  );
};

export default MateMyPageIndex;
