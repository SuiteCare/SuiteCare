import React, { useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from './FamilyCalendarModal.module.css';
import MateDetailModal from '@/components/Common/Modal/Detail/MateDetailModal';
import Loading from '@/components/Common/Modal/Loading';

import { weekdayDic } from '@/utils/calculators';

const ModalReservationTab = ({ modalData, closeModal }) => {
  const { openModal: openDetailModal, isModalVisible: isDetailModalVisible, closeModal: closeDetailModal } = useModal();
  const [mateDetailModalData, setMateDetailModalData] = useState();
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가

  const mutation = useMutation(
    async ($mateId) => {
      try {
        const response = await axiosInstance.get(`/api/v1/mate/resume/${$mateId}`);
        const msg = response.headers.get('msg');
        if (response.data) {
          setMateDetailModalData({ ...modalData, ...response.data });
          return response.data;
        }
        if (msg === 'fail') {
          console.log('데이터 불러오기 실패');
          return {};
        }
      } catch (error) {
        console.error('Error occurred while fetching modal data:', error);
        return {};
      }
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        openDetailModal();
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Error occurred while fetching modal data:', error);
      },
    },
  );

  const handleShowModal = () => {
    mutation.mutate(modalData.detail.reservation.mate_resume_id);
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
