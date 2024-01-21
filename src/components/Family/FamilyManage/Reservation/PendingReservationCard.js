import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import styles from './PendingReservationCard.module.css';
import ReservationPatientInfo from './ReservationPatientInfo';
import SearchResultCard from '../../FamilyMateSearch/SearchResultCard';
import MateDetailModal from '../../FamilyMateSearch/MateDetailModal';

const PendingReservationCard = ({ data, mateList }) => {
  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  async function getModalData($mateId) {
    try {
      const response = await axios.get('/api/v1/familymatesearch', { params: $mateId });
      {
        /* * 변경 필요 * */
      }
      const msg = response.headers.get('msg');
      if (response.status === 200 && msg === 'success') {
        alert(response.data);
        console.log(response.data);
        return response.data;
      }
      if (msg === 'fail') {
        alert('데이터 불러오기 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  }

  const handleShowModal = async (defaultData) => {
    const combinedData = { ...defaultData, ...(await getModalData(defaultData.mate_id)) };
    setModalData(combinedData);
    openModal();
  };

  const handleConfirm = ($id) => {
    alert($id);
  };

  const {
    data: resData,
    isErrorForResData,
    isLoadingForResData,
  } = useQuery(
    ['resData', data.reservation_id],
    async () => {
      const response = await axiosInstance.get('/api/v1/reservationInfo', {
        params: { reservation_id: data.reservation_id },
      });
      return response.data;
    },
    {
      enabled: Boolean(data.reservation_id),
    },
  );

  return (
    <div className={styles.PendingReservationCard}>
      {resData?.weekday.length > 0 ? (
        <>
          <ReservationPatientInfo
            styles={styles}
            fullData={{
              patient: {
                family_id: data.family_id,
                patient_id: data.patient_id,
                name: data.name,
                diagnosis_name: data.diagnosis_name,
                birthday: data.birthday,
                gender: data.gender,
                weight: data.weight,
                height: data.height,
              },
              reservation: {
                ...resData,
                start_date: data.start_date,
                end_date: data.end_date,
                start_time: resData.start_time.slice(0, 5),
                end_time: resData.end_time.slice(0, 5),
                weekday: resData.weekday.split(',').map((e) => +e),
              },
            }}
          />
          <hr />
          {mateList?.length > 0 ? (
            mateList.map((e) => (
              <SearchResultCard
                data={e}
                key={e.id}
                showDetail={() => handleShowModal(e)}
                handleConfirm={handleConfirm}
              />
            ))
          ) : (
            <div className='no_result'>아직 지원자가 없습니다.</div>
          )}
          {isModalVisible && (
            <MateDetailModal modalData={modalData} closeModal={closeModal} handleConfirm={handleConfirm} />
          )}
        </>
      ) : (
        <div className='no_result'>예약 데이터를 불러오는 중 오류가 발생했습니다.</div>
      )}
    </div>
  );
};

export default PendingReservationCard;
