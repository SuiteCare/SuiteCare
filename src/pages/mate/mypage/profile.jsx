import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import Profile from '@/components/Mate/MateMyPage/Profile';

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
      <Profile profile={data} />
    </div>
  );
};

export default ProfilePage;
