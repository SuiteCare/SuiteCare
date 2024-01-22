import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import Profile from '@/components/Mate/MateMyPage/Profile';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const ProfilePage = () => {
  const [data, setData] = useState([]);

  const getData = async ($id) => {
    try {
      const res = await axios.get(`/api/v1/mate/profile`, {
        params: {
          id: $id,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loginId = JSON.parse(sessionStorage.getItem('login_info')).login_id;
    getData(loginId);
  }, []);

  return (
    <div>
      <Header />
      <div className='page_with_sidebar'>
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
