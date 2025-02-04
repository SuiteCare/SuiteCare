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
    ['recruitmentList'],
    async () => {
      const { data } = await axiosInstance.get(`/api/v1/recruitment-list`);
      if(data.code === 200) {
        return data.result.filter((e) => e.request_by === 'F' && new Date(e.expire_at).getTime() > new Date().getTime());
      }
      return [];
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
      if(data.code === 200) {
        return data.result[0];
      }

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
    console.log('!!!', eachData);
    setRecruitId(eachData.recruitment_id);
    setModalData(eachData);
    openModal();
  };

  return (
    <>
      {isModalVisible && <RecruitmentDetailModal modalData={modalData} closeModal={closeModal} />}
      {isLoading && <Loading />}
      {isError && (
        <div className='no_result'>
          <p>데이터를 가져오는 중에 오류가 발생했습니다.</p>
        </div>
      )}
      {!dataList && dataList?.length < 0 ? (
        <div className='no_result'>
          <p>나에게 들어온 간병 요청이 없습니다.</p>
        </div>
      ) : (
        dataList?.map((data) => (
          <OfferedRecruitmentCard key={data.recruitment_id} data={data} showDetail={() => handleShowModal(data)} />
        ))
      )}
    </>
  );
};

export default MateOffer;
