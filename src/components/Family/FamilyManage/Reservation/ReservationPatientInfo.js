import React from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import PatientDetailModal from './PatientDetailModal';

import { calAge, genderToKo, countWeekdays, calTimeDiff, weekdayDic } from '@/utils/calculators';

const ReservationPatientInfo = ({ styles, fullData }) => {
  const {
    isModalVisible: isPatientModalVisible,
    openModal: openPatientModal,
    closeModal: closePatientModal,
  } = useModal();

  const {
    data: patientDetail,
    isErrorForPatientDetail,
    isLoadingForPatientDetail,
  } = useQuery(
    ['patientDetail', fullData.patient.patient_id],
    async () => {
      const response = await axiosInstance.get(`/api/v1/patientDetail/${fullData.patient.patient_id}`, {
        params: { id: fullData.patient.patient_id },
      });
      return response.data;
    },
    {
      enabled: Boolean(fullData.patient.patient_id),
    },
  );

  const handleDetailClick = () => {
    openPatientModal();
  };

  return (
    <div className={styles.reservation_info}>
      <div className={styles.info_section}>
        <div>
          <h5>{fullData.patient.name} 환자 기본정보</h5>
          <div className={`${styles.info_wrapper}`}>
            <label>진단명</label>
            <span>{fullData.patient.diagnosis_name}</span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>나이</label>
            <span>
              만 {calAge(fullData.patient.birthday)}세 {genderToKo(fullData.patient.gender)}성
            </span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>키</label>
            <span>{fullData.patient.height} cm</span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>몸무게</label>
            <span>{fullData.patient.weight} kg</span>
          </div>
        </div>
        <div className={styles.search_button_wrapper}>
          <button type='button' onClick={() => handleDetailClick(fullData.patient.patient_id)}>
            환자 상세정보
          </button>
        </div>
      </div>
      {/* 간병 정보 시작 */}
      <div className={styles.info_section}>
        <h5>간병예약 정보</h5>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병지 주소</label>
          <div>
            <span
              className={`${styles.location} ${
                fullData.reservation.location === '자택' ? styles.home : styles.hospital
              }`}
            >
              {fullData.reservation.location}
            </span>
            <span>{fullData.reservation.road_address}</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 기간</label>
          <span>
            {fullData.reservation.start_date} ~ {fullData.reservation.end_date}{' '}
            <span>
              (총{' '}
              {countWeekdays(
                fullData.reservation.start_date,
                fullData.reservation.end_date,
                fullData.reservation.weekday,
              )}
              일)
            </span>
          </span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 요일</label>
          <span>{fullData.reservation.weekday.map((e) => weekdayDic[e]).join(', ')}</span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>출퇴근시간</label>
          <span>
            {fullData.reservation.start_time} ~ {fullData.reservation.end_time}{' '}
            <span>(총 {calTimeDiff(fullData.reservation.start_time, fullData.reservation.end_time)}시간)</span>
          </span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>제시 시급</label>
          <span>{fullData.reservation.wage.toLocaleString()}원</span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>예상 총 급여</label>
          <span>
            {(
              fullData.reservation.wage *
              calTimeDiff(fullData.reservation.start_time, fullData.reservation.end_time) *
              countWeekdays(
                fullData.reservation.start_date,
                fullData.reservation.end_date,
                fullData.reservation.weekday,
              )
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      {isPatientModalVisible && (
        <PatientDetailModal modalData={{ ...fullData?.patient, ...patientDetail }} closeModal={closePatientModal} />
      )}
    </div>
  );
};

export default ReservationPatientInfo;
