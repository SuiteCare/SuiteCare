import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';

import axiosInstance from '@/services/axiosInstance';
import usePatientList from '@/hooks/usePatientList';

import styles from './PendingReservation.module.css';
import PendingReservationCard from './PendingReservationCard';

const PendingReservation = () => {
  const navigator = useRouter();

  const [loginId, setLoginId] = useState(null);
  const patientList = usePatientList(loginId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
    }
  }, []);

  const selectPatient = ($id) => patientList.filter((e) => e.id === $id);

  const [reservationList, setReservationList] = useState();
  useEffect(() => {
    const getReservationList = async () => {
      try {
        const response = await axios.get('/api/v1/patient', { params: { id: loginId } }); // , status: 'P'
        setReservationList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (loginId) {
      getReservationList();
    }
  }, [loginId]);

  const [reservationInfo, setReservationInfo] = useState({});

  const handleReservationSelectChange = (e) => {
    if (e.target.value === 'add') {
      if (window.confirm('새로운 간병예약 신청 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/reservation');
      }
    } else {
      const selectedReservation = reservationList.filter((v) => v.id === +e.target.value)[0];
      const selectedPatient = selectPatient(selectedReservation.patient_id);
      console.log('집어넣은 id는 숫자인가?', selectedReservation.patient_id);

      setReservationInfo(selectedReservation);
      setReservationInfo((prevData) => ({
        ...prevData,
        reservation_id: selectedReservation.id,
        ...selectedPatient,
      }));
    }
  };

  return (
    <div className={styles.PendingReservation}>
      <div className={`${styles.select_reservation} input_wrapper`}>
        <label>간병예약 목록</label>
        <select onChange={handleReservationSelectChange}>
          <option>간병예약 선택</option>
          {reservationList?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.diagnosis_name}) | {e.start_date} ~ {e.end_date}
            </option>
          ))}
          <option value='add'>새로운 간병 예약하기</option>
        </select>
      </div>

      <hr />

      {reservationInfo && reservationInfo.length > 0 ? (
        <PendingReservationCard data={reservationInfo} mateList={mateList} id={reservationInfo.id} />
      ) : (
        <div style={{ textAlign: 'center' }}>정보를 확인할 간병 예약을 선택하세요.</div>
      )}
    </div>
  );
};

export default PendingReservation;
