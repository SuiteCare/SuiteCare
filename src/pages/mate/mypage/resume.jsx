import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';
import useAlert from '@/hooks/useAlert';

import Header from '@/components/Mate/MateHeader/MateHeader';
import Resume from '@/components/Mate/MateMyPage/Resume';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const ResumePage = () => {
  const { id } = useLoginInfo();
  const { openAlert } = useAlert();

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
      if (response.status === 200) {
        return response.data.result[0];
      }
      if (response.status === 204) {
        openAlert('요청한 사용자의 정보가 조회되지 않습니다.');
      }
    },
    {
      enabled: Boolean(id),
      retry: 0,
    },
  );

  const {
    data: resumeData,
    isResumeError,
    isResumeLoading,
  } = useQuery(
    ['resumeData', id],
    async () => {
      const { data } = await axiosInstance.get(`/api/v1/mate/resume/${id}`);
      if(data.code === 200) {
        return data.result[0];
      }
    },
    {
      enabled: Boolean(id),
      retry: 0,
    },
  );

  useEffect(() => {
    if (mypageData) {
      setData({
        mypage: mypageData,
        resume: resumeData || {},
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
