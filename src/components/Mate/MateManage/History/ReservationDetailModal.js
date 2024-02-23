import React, { useState } from 'react';
import { useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from '@/components/Common/Modal/Modal.module.css';
import ReservationData from './ReservationData';
import PatientData from './PatientData';
import Loading from '@/components/Common/Modal/Loading';

const ReservationDetailModal = ({ reservationId, closeModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { handleContentClick } = useModal();

  const { data, isError, isLoading } = useQuery(
    ['reservationList', reservationId],
    async () => {
      const response = await axiosInstance.get(`/api/v1/reservation/${reservationId}`);
      // 리스트업된 table에서 detail을 누르면 reservation ID가 전달될 것
      return response.data;
    },
    {
      enabled: Boolean(reservationId),
    },
  );

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.Modal} onClick={closeModal}>
        <div className={styles.modal_wrapper} onClick={handleContentClick}>
          <div className='close_button'>
            <span onClick={closeModal} />
          </div>

          <div className='tab_wrapper'>
            <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
              예약 정보
            </div>
            <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
              환자 정보
            </div>
          </div>

          {!isLoading && (
            <>
              {activeTab === 0 && <ReservationData styles={styles} reservationData={{ ...reservationId, ...data }} />}
              {activeTab === 1 && (
                <PatientData styles={styles} patientData={{ ...data, ...reservationId }} patientDetailData={data} />
              )}
            </>
          )}
          {isError && <div className='error'>데이터를 가져오는 데 실패하였습니다.</div>}
        </div>
      </div>
    </>
  );
};

export default ReservationDetailModal;
