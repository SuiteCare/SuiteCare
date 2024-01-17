import { useEffect, useState } from 'react';
import axios from 'axios';

import useModal from '@/hooks/useModal';

import PatientDetailModal from './PatientDetailModal';

import { calAge, genderToKo, countWeekdays, calTimeDiff, weekdayDic } from '@/utils/calculators';

const ReservationPatientInfo = ({ styles, resData, id }) => {
  const [patientDetail, setPatientDetail] = useState({});
  const {
    isModalVisible: isPatientModalVisible,
    openModal: openPatientModal,
    closeModal: closePatientModal,
  } = useModal();

  const getPatientDetail = async ($id) => {
    try {
      const patientPromise = axios.get(`/api/v1/patient/${$id}`);
      const patientDetailPromise = axios.get(`/api/v1/patientDetail/${$id}`);

      const [patientResponse, patientDetailResponse] = await Promise.all([patientPromise, patientDetailPromise]);

      setPatientDetail({
        ...patientResponse.data,
        ...patientDetailResponse.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailClick = ($id) => {
    getPatientDetail($id);
    openPatientModal();
  };

  useEffect(() => {
    getPatientDetail(id);
  }, []);

  return (
    <div className={styles.reservation_info}>
      <div className={styles.info_section}>
        <div>
          <h5>{patientDetail.name} 환자 기본정보</h5>
          <div className={`${styles.info_wrapper}`}>
            <label>진단명</label>
            <span>{patientDetail.diagnosis_name}</span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>나이/성별</label>
            <span>
              만 {calAge(patientDetail.birthday)}세 {genderToKo(patientDetail.gender)}성
            </span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>키</label>
            <span>{patientDetail.height} cm</span>
          </div>

          <div className={`${styles.info_wrapper}`}>
            <label>몸무게</label>
            <span>{patientDetail.weight} kg</span>
          </div>
        </div>
        <div className={styles.search_button_wrapper}>
          <button onClick={() => handleDetailClick(patientDetail.id)}>환자 상세정보</button>
        </div>
      </div>
      {/* 간병 정보 시작 */}
      <div className={styles.info_section}>
        <h5>간병예약 정보</h5>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병지 주소</label>
          <div>
            <span className={`${styles.location} ${resData.location === '자택' ? styles.home : styles.hospital}`}>
              {resData.location}
            </span>
            <span>{resData.road_address}</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 기간</label>
          <span>
            {resData.start_date} ~ {resData.end_date}{' '}
            <span>
              (총 {countWeekdays(resData.start_date, resData.end_date, resData.weekday)}
              일)
            </span>
          </span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 요일</label>
          <span>{resData.weekday.map((e) => weekdayDic[e]).join(', ')}</span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>출퇴근시간</label>
          <span>
            {resData.start_time} ~ {resData.end_time}{' '}
            <span>(총 {calTimeDiff(resData.start_time, resData.end_time)}시간)</span>
          </span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>제시 시급</label>
          <span>{resData.wage.toLocaleString()}원</span>
        </div>

        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>예상 총 급여</label>
          <span>
            {(
              resData.wage *
              calTimeDiff(resData.start_time, resData.end_time) *
              countWeekdays(resData.start_date, resData.end_date, resData.weekday)
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      {isPatientModalVisible && <PatientDetailModal modalData={patientDetail} closeModal={closePatientModal} />}
    </div>
  );
};

export default ReservationPatientInfo;
