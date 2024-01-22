import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./mypage/profile');
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

export default ProfilePage;
