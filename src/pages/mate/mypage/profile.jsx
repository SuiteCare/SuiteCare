import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import Profile from '@/components/Mate/MateMyPage/Profile';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';
import Loading from '@/components/Common/Modal/Loading';

const ProfilePage = () => {
  const [loginId, setLoginId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info')).login_id);
    }
  }, []);

  const { data, isError, isLoading } = useQuery(
    ['data', loginId],
    async () => {
      const response = await axiosInstance.get('/api/v1/mate/profile', {
        params: {
          id: loginId,
        },
      });
      return response.data;
    },
    {
      enabled: Boolean(loginId),
    },
  );

  return (
    <div>
      <Header />
      <div className='page_with_sidebar'>
        {isLoading ? <Loading /> : ''}
        <MateMyPageSidebar activeMenu='profile' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>메이트 프로필</h1>
            <span>나의 이력 정보를 등록하고 수정할 수 있습니다.</span>
          </div>
          <Profile profile={data} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
