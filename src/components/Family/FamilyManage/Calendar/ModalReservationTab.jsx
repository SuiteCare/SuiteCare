import React, { useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import MateDetailModal from '@/components/Common/Modal/Detail/MateDetailModal';
import Loading from '@/components/Common/Modal/Loading';

import { minWage, weekdayDic } from '@/utils/calculators';

const ModalReservationTab = ({ modalData, styles }) => {
  const { openModal: openDetailModal, isModalVisible: isDetailModalVisible, closeModal: closeDetailModal } = useModal();
  const [mateDetailModalData, setMateDetailModalData] = useState();
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가

  const combinedMutation = useMutation(
    async ($mateResumeId) => {
      try {
        setIsLoading(true);
        const [resumeResponse, searchResponse] = await Promise.all([
          axiosInstance.get(`/api/v1/mate/resume/${$mateResumeId}`),
          axiosInstance.get(`/api/v1/search/mate`, {
            search_name: $mateResumeId,
            location: [
              '강남구',
              '강동구',
              '강북구',
              '강서구',
              '관악구',
              '광진구',
              '구로구',
              '금천구',
              '노원구',
              '도봉구',
              '동대문구',
              '동작구',
              '서대문구',
              '서초구',
              '성동구',
              '성북구',
              '송파구',
              '양천구',
              '영등포구',
              '용산구',
              '은평구',
              '종로구',
              '중구',
              '중랑구',
            ],
            gender: [],
            wage: [minWage, 100000],
          }),
        ]);

        const resumeData = resumeResponse.data;
        const searchData = searchResponse.data;

        if (resumeData && searchData) {
          setMateDetailModalData({ ...searchData[0], ...resumeData });
          return { resumeData, searchData: searchData[0] };
        }
        console.log('데이터 불러오기 실패');
        return {};
      } catch (error) {
        console.error('Error occurred while fetching modal data:', error);
        return {};
      } finally {
        setIsLoading(false);
      }
    },
    {
      onSuccess: () => {
        openDetailModal();
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Error occurred while fetching modal data:', error);
      },
    },
  );

  const handleShowModal = () => {
    combinedMutation.mutate(modalData.detail.reservation.mate_resume_id);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isDetailModalVisible && (
        <MateDetailModal modalData={mateDetailModalData} closeModal={closeDetailModal} pagePosition='FamilyCalendar' />
      )}
      <div className='input_wrapper'>
        <label>{modalData.mate.slice(0, 6)}</label>
        <div className={styles.input_with_button}>
          {modalData.mate.slice(6)}
          <button onClick={handleShowModal}>상세정보 보기</button>
        </div>
      </div>
      <hr />
      <div className='input_wrapper'>
        <label>간병지 주소</label>
        <div>
          <span className={`${modalData.detail.reservation.location === 'hospital' ? styles.hospital : styles.home}`}>
            {modalData.detail.reservation.location}
          </span>{' '}
          {modalData.detail.reservation.road_address} {modalData.detail.reservation.address_detail}
        </div>
      </div>
      <div className='input_wrapper'>
        <label>간병 기간</label>
        {modalData.detail.reservation.start_date} ~ {modalData.detail.reservation.end_date}
      </div>
      <div className='input_wrapper'>
        <label>간병 요일</label>
        {modalData.detail.reservation.weekdays.map((e) => weekdayDic[e]).join(', ')}
      </div>
      <div className='input_wrapper'>
        <label>시급</label>
        {modalData.detail.reservation.wage.toLocaleString()}원
      </div>
    </>
  );
};

export default ModalReservationTab;
