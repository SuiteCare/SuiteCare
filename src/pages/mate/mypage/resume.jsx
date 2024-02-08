import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import Header from '@/components/Mate/MateHeader/MateHeader';
import Resume from '@/components/Mate/MateMyPage/Resume';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const ResumePage = () => {
  const { id } = useLoginInfo();

  const [data, setData] = useState({
    mypage: '',
    resume: '',
  });

  const {
    data: mypageData,
    isMypageError,
    isMypageLoading,
  } = useQuery(
    ['mypageData', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/mypage', { params: { id } });
      return response.data;
    },
    {
      enabled: Boolean(id),
    },
  );

  const {
    data: resumeData,
    isResumeError,
    isResumeLoading,
  } = useQuery(
    ['resumeData', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/mate/resume', { params: { id } });
      return response.data;
    },
    {
      enabled: Boolean(id),
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
            <h1>메이트 이력서</h1>
            <span>나의 간병이력 정보를 등록하고 수정할 수 있습니다.</span>
          </div>
          <Resume data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
