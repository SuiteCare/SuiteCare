import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './PendingReservation.module.css';
import PendingReservationCard from './PendingReservationCard';
import Loading from '@/components/Common/Modal/Loading';

const PendingReservation = () => {
  const navigator = useRouter();

  const { id } = useLoginInfo();
  const { isError, isLoading, patientList } = usePatientList(id);

  const {
    data: reservationList,
    isError: isResListError,
    isLoading: isResListLoading,
  } = useQuery(
    ['reservationList', id],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/pendingReservation', { params: { id } });
      return data.reverse();
    },
    {
      enabled: Boolean(id),
    },
  );

  const selectPatient = ($id) => patientList?.filter((e) => e.id === $id)[0];

  const [reservationInfo, setReservationInfo] = useState({});
  const [selectedResId, setSelectedResId] = useState(null);

  const {
    data: mateList,
    isError: isMateListError,
    isLoading: isMateListLoading,
  } = useQuery(
    ['mateList', selectedResId],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/applicant-list', { params: { reservation_id: selectedResId } });
      console.log('mateList', selectedResId, data);
      return data;
    },
    {
      enabled: Boolean(selectedResId),
    },
  );

  const handleSelectChange = (e) => {
    const newValue = e.target.value;

    if (newValue === 'add') {
      if (window.confirm('새로운 간병예약 신청 페이지로 이동하시겠습니까?')) {
        navigator.push('/family/addpatient');
      }
    } else {
      const selectedReservation = reservationList?.find((v) => v.reservation_id === +newValue);
      const selectedPatient = selectPatient(selectedReservation?.patient_id);

      setReservationInfo((prevData) => ({
        ...prevData,
        ...selectedReservation,
        ...selectedPatient,
      }));

      setSelectedResId(selectedReservation?.reservation_id);
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className={styles.PendingReservation}>
      {isLoading || isResListLoading || isMateListLoading ? <Loading /> : ''}
      <div className={`${styles.select_reservation} input_wrapper`}>
        <label>간병예약 목록</label>
        <select onChange={handleSelectChange}>
          <option onSelect={handleReset}>간병예약 선택</option>
          {reservationList?.map((e, i) => (
            <option key={e.reservation_id} value={e.reservation_id}>
              {reservationList.length - i}. {selectPatient(e.patient_id)?.name} (
              {selectPatient(e.patient_id)?.diagnosis_name}) | {e.start_date} ~ {e.end_date}
            </option>
          ))}
          <option value='add'>새로운 간병 예약하기</option>
        </select>
      </div>
      <hr />
      {reservationInfo?.reservation_id ? (
        <PendingReservationCard data={reservationInfo} mateList={mateList} />
      ) : (
        <div className='no_result'>정보를 확인할 간병 예약을 선택하세요.</div>
      )}
    </div>
  );
};

export default PendingReservation;
