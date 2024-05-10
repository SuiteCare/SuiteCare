import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import HistoryTable from './HistoryTable';
import Loading from '@/components/Common/Modal/Loading';
import ReservationDetailModal from '@/components/Common/Modal/Detail/ReservationDetailModal';
import AddReviewModal from '@/components/Common/Modal/AddReviewModal';

const FamilyHistory = () => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { isModalVisible:isReviewModalVisible, openModal:openReviewModal, closeModal:closeReviewModal } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState();

  const mutation = useMutation(async ($tab) => {
    const targetURL = {
      0: 'recruitment',
      1: 'reservation/family',
    };

    try {
      const { data } = await axiosInstance.get(`/api/v1/${targetURL[$tab]}`);
      const { code, result } = data;
      if (code === 200) {
        setTabData(result.reverse());
        return result.reverse();
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      setTabData([]);
      return [];
    } catch (error) {
      const { code } = error.response.data;
      console.error(code);
    }
  });

  useEffect(() => {
    mutation.mutate(activeTab);
  }, [activeTab]);

  const [detailData, setDetailData] = useState();
  const [patientData, setPatientData] = useState();

  const recruitmentDetailMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data: recruitmentDetailResponse } = await axiosInstance.get(
        `/api/v1/recruitment/${$recruitmentId}/detail`,
      );
      const { code, result } = recruitmentDetailResponse;
      if (code === 200) {
        setDetailData({ ...tabData.find((e) => e.id === $recruitmentId), ...result[0] });
        return result[0];
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      return {};
    } catch (error) {
      const { code } = error.response.data;
      return code;
    }
  });

  const recruitmentPatientMutation = useMutation(async ($recruitmentId) => {
    try {
      const { data: recruitmentPatientResponse } = await axiosInstance.get(
        `/api/v1/recruitment/${$recruitmentId}/patient`,
      );
      const { code, result } = recruitmentPatientResponse;
      if (code === 200) {
        setPatientData(result[0]);
        return result[0];
      }
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      return {};
    } catch (error) {
      const { code } = error.response.data;
      return code;
    }
  });

  const handleDetailClick = async ($recruitmentId) => {
    try {
      const [detailResult, patientResult] = await Promise.all([
        recruitmentDetailMutation.mutateAsync($recruitmentId),
        recruitmentPatientMutation.mutateAsync($recruitmentId),
      ]);

      if (detailResult && patientResult) {
        openModal();
      } else {
        console.error('데이터를 가져오는 데 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('데이터를 가져오는 데 오류가 발생했습니다.', error);
    }
  };

  const [reviewData, setReviewData] = useState();

  const handleReviewClick = async ($data) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/review/${$data.review_id}`);
      await Promise.all([
        recruitmentDetailMutation.mutateAsync($data.recruitment_id),
        recruitmentPatientMutation.mutateAsync($data.recruitment_id),
      ]);
      if (data.code === 200) {
        setReviewData({
          reservation: $data,
          reviewData: data.result[0]});
        return data.result[0];
      }
      console.log('데이터를 불러오는 데 오류가 발생했습니다.');
      return [];
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    if (reviewData) {
      console.log(reviewData);
      openReviewModal();
    } else {
      console.error('데이터를 가져오는 데 오류가 발생했습니다.');
    }
  }, [reviewData]);


  return (
    <>
      <div className='FamilyHistory'>
        {!tabData && <Loading />}
        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            공고 등록 내역
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            간병 예약 내역
          </div>
        </div>
        {activeTab === 0 &&
          (tabData && tabData.length > 0 ? (
            <HistoryTable data={tabData} handleDetailClick={handleDetailClick} tabType='recruitment' />
          ) : (
            <div className='no_result'>
              <p>간병 공고 등록 내역이 없습니다.</p>
              <br />
              <button onClick={() => (window.location.href = '/family/recruitment')}>신규 간병 공고 등록하기</button>
            </div>
          ))}
        {activeTab === 1 &&
          (tabData && tabData.length > 0 ? (
            <HistoryTable
              data={tabData}
              handleDetailClick={handleDetailClick}
              handleReviewClick={handleReviewClick}
              tabType='reservation'
            />
          ) : (
            <div className='no_result'>간병 예약 확정 내역이 없습니다.</div>
          ))}
      </div>
      {isModalVisible && (
        <ReservationDetailModal modalData={{ ...detailData, ...patientData }} closeModal={closeModal} page='family' />
      )}
      {isReviewModalVisible && (
        <AddReviewModal modalData={{reviewData, detailData, patientData}} closeModal={closeReviewModal} page='family' />
      )}
    </>
  );
};

export default FamilyHistory;
