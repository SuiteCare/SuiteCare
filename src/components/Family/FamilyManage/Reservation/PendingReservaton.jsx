import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import styles from './PendingReservation.module.css';
import PendingReservationCard from './PendingReservationCard';

const PendingReservation = () => {
  const navigator = useRouter();

  const [loginId, setLoginId] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
    } else {
      return null;
    }
  }, []);

  const {
    data: reservationList,
    isError,
    isLoading,
  } = useQuery(
    ['reservationList', loginId],
    async () => {
      const response = await axiosInstance.get('/api/v1/patient', { params: { id: loginId } });
      {
        /** 명세에 맞춰 url 변경 필요, id로 해당멤버의 예약정보 중 간병인 null이고 start_date가 오늘 이후인 거 가져옴 * */
      }
      return response.data;
    },
    {
      enabled: Boolean(loginId),
    },
  );

  const [reservationInfo, setReservationInfo] = useState({});

  const handleReservationSelectChange = (e) => {
    if (e.target.value === 'add') {
      if (window.confirm('새로운 간병예약 신청 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/reservation');
      }
    } else {
      const selectedReservation = reservationList.filter((v) => v.id === +e.target.value)[0];
      setReservationInfo(selectedReservation);
      setReservationInfo((prevData) => ({
        ...prevData,
        reservation_id: selectedReservation.id,
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
              {e.name} ({e.diagnosis_name}) | 간병기간 입력
            </option>
          ))}
          <option value='add'>새로운 간병 예약하기</option>
        </select>
      </div>

      <hr />

      {reservationInfo ? (
        <PendingReservationCard id={reservationInfo.id} />
      ) : (
        <div style={{ textAlign: 'center' }}>정보를 확인할 간병 예약을 선택하세요.</div>
      )}
    </div>
  );
};

export default PendingReservation;
