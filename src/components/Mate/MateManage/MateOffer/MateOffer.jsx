import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import OfferedRecruitmentCard from './OfferedRecruitmentCard';
import RecruitmentDetailModal from '../../MateRecruitmentSearch/RecruitmentDetailModal';
import Loading from '@/components/Common/Modal/Loading';

const MateOffer = () => {
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
      const { data } = await axiosInstance.get(`/api/v1/offer/recruitment-list`);
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
          <OfferedRecruitmentCard key={data.recruitment_id} data={data} showDetail={() => handleShowModal(data)} />
        ))
      ) : (
        <div className='no_result'>
          <p>나에게 들어온 간병 요청이 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default MateOffer;
