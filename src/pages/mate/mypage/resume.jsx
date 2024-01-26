import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import Header from '@/components/Mate/MateHeader/MateHeader';
import Resume from '@/components/Mate/MateMyPage/Resume';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const ResumePage = () => {
  const [loginId, setLoginId] = useState('');
  const [data, setData] = useState({
    mypage: '',
    resume: '',
  });

  useEffect(() => {
    setLoginId(JSON.parse(sessionStorage.getItem('login_info')).login_id);
  }, []);

  const {
    data: mypageData,
    isMypageError,
    isMypageLoading,
  } = useQuery(
    ['mypageData', loginId],
    async () => {
      const response = await axiosInstance.get('/api/v1/mypage', { params: { id: loginId } });
      return response.data;
    },
    {
      enabled: Boolean(loginId),
    },
  );

  const {
    data: resumeData,
    isResumeError,
    isResumeLoading,
  } = useQuery(
    ['mypageData', loginId],
    async () => {
      const response = await axiosInstance.get('/api/v1/mate/resume', { params: { id: loginId } });
      return response.data;
    },
    {
      enabled: Boolean(loginId),
    },
  );

  useEffect(() => {
    if (mypageData && resumeData) {
      setData({
        mypage: mypageData,
        resume: resumeData,
      });
    }
  }, [mypageData, resumeData]);

  return (
    <div>
      <Header />
      <div className='page_with_sidebar'>
        <MateMyPageSidebar activeMenu='resume' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>메이트 프로필</h1>
            <span>나의 이력 정보를 등록하고 수정할 수 있습니다.</span>
          </div>
          <Resume data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
