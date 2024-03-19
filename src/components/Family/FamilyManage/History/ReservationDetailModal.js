import React, { useState } from 'react';
import { useQueries } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from '@/components/Common/Modal/Modal.module.css';
import ReservationData from './ReservationData';
import PatientData from './PatientData';
import Loading from '@/components/Common/Modal/Loading';

const ReservationDetailModal = ({ selectedReservation, closeModal }) => {
  console.log(selectedReservation);
  const [activeTab, setActiveTab] = useState(0);
  const { handleContentClick } = useModal();

  const results = useQueries([
    {
      queryKey: ['patient', selectedReservation.patient_id],
      queryFn: () => axiosInstance.get(`/api/v1/patient/${selectedReservation.patient_id}`), // 옛날식임.. 고쳐야 됨
      enabled: !!selectedReservation.patient_id,
      staleTime: 1000 * 60 * 1,
    },
    {
      queryKey: ['patientDetail', selectedReservation.patient_id],
      queryFn: () => axiosInstance.get(`/api/v1/patientDetail/${selectedReservation.patient_id}`),
      enabled: !!selectedReservation.patient_id,
      staleTime: 1000 * 60 * 1,
    },
    {
      queryKey: ['reservation', selectedReservation.id],
      queryFn: () => axiosInstance.get(`/api/v1/reservation/${selectedReservation.id}`),
      enabled: !!selectedReservation.id,
      staleTime: 1000 * 60 * 1,
    },
  ]);

  const isError = results.some((result) => result.isError);
  const isSuccess = results.every((result) => result.isSuccess);

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const patientData = results[0]?.data?.data;
  const patientDetailData = results[1]?.data?.data;
  const reservationData = results[2]?.data?.data;

  return (
    <>
      {!isSuccess && <Loading />}
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

          {isSuccess && (
            <>
              {activeTab === 0 && (
                <ReservationData styles={styles} reservationData={{ ...selectedReservation, ...reservationData }} />
              )}
              {activeTab === 1 && (
                <PatientData
                  styles={styles}
                  patientData={{ ...patientData, ...selectedReservation.patient_id }}
                  patientDetailData={patientDetailData}
                />
              )}
            </>
          )}
          {!isSuccess && <div className='error'>데이터를 가져오는 데 실패하였습니다.</div>}
        </div>
      </div>
    </>
  );
};

export default ReservationDetailModal;
