import { useEffect, useState } from 'react';
import axios from 'axios';

import useModal from '@/hooks/useModal';

import styles from './PendingReservationCard.module.css';
import ReservationPatientInfo from './ReservationPatientInfo';
import SearchResultCard from '../../FamilyMateSearch/SearchResultCard';
import MateDetailModal from '../../FamilyMateSearch/MateDetailModal';

const PendingReservationCard = ({ data, mateList, id }) => {
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

  return (
    <div className={styles.PendingReservationCard}>
      <ReservationPatientInfo styles={styles} resData={data.reservation} id={id} />
      <hr />
      {mateList && mateList.length > 0 ? (
        mateList.map((e) => (
          <SearchResultCard data={e} key={e.id} showDetail={() => handleShowModal(e)} handleConfirm={handleConfirm} />
        ))
      ) : (
        <div className={styles.no_result}>신청자가 없습니다.</div>
      )}
      {isModalVisible && (
        <MateDetailModal modalData={modalData} closeModal={closeModal} handleConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default PendingReservationCard;
