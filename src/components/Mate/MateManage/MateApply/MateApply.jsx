import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import AppliedRecruitmentCard from './AppliedRecruitmentCard';
import RecruitmentDetailModal from '../../MateRecruitmentSearch/RecruitmentDetailModal';
import Loading from '@/components/Common/Modal/Loading';

const MateApply = () => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [recruitId, setRecruitId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const {
    data: dataList,
    isError,
    isLoading,
  } = useQuery(
    ['patientDetail'],
    async () => {
      const { data } = await axiosInstance.get(`/api/v1/apply/recruitment-list`);
      return data;
    },
    {
      enabled: true,
    },
  );

  const { data: patientDetail } = useQuery(
    ['patientDetail', recruitId],
    async () => {
      if (!recruitId) return;
      const { data } = await axiosInstance.get(`/api/v1/recruitment/${recruitId}/patient`);
      return data;
    },
    {
      enabled: Boolean(recruitId),
    },
  );

  useEffect(() => {
    if (recruitId && patientDetail) {
      setModalData((prev) => ({ ...prev, ...patientDetail }));
    }
  }, [patientDetail, recruitId]);

  const handleShowModal = (eachData) => {
    setRecruitId(eachData.recruitment_id);
    setModalData(eachData);
    openModal();
  };

  return (
    <>
      {isModalVisible && <RecruitmentDetailModal modalData={modalData} closeModal={closeModal} />}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className='no_result'>
          <p>데이터를 가져오는 중에 오류가 발생했습니다.</p>
        </div>
      ) : dataList && dataList.length > 0 ? (
        dataList.map((data) => (
          <AppliedRecruitmentCard key={data.recruitment_id} data={data} showDetail={() => handleShowModal(data)} />
        ))
      ) : (
        <div className='no_result'>
          <p>지원한 간병 공고가 없습니다.</p>
          <br />
          <button onClick={() => (location.href = '/mate/search')}>간병 공고 검색하기</button>
        </div>
      )}
    </>
  );
};

export default MateApply;
