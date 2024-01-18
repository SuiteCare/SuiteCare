import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useLoginInfo from '@/hooks/useLoginInfo';

import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import Profile from '@/components/Mate/MateMyPage/Profile';

const ProfilePage = () => {
  const [data, setData] = useState([]);
  const { token, id } = useLoginInfo();

  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/mate/profile`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && token) {
      getData();
    }
  }, [token]);

  return (
    <div>
      <Header />
      <Profile profile={data} />
    </div>
  );
};

export default ProfilePage;
