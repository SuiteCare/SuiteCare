import { useEffect, useState } from 'react';
import axios from 'axios';

import useModal from '@/hooks/useModal';

import styles from './PendingReservationCard.module.css';
import ReservationPatientInfo from './ReservationPatientInfo';
import SearchResultCard from '../../FamilyMateSearch/SearchResultCard';
import MateDetailModal from '../../FamilyMateSearch/MateDetailModal';

const PendingReservationCard = ({ id }) => {
  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  const oneweekafter = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(
    new Date().getDate() + 7
  )
    .toString()
    .padStart(2, '0')}`;

  const dummydata = {
    patient: {
      id: 4,
      name: '김환자',
      birthday: '1965-01-01',
      gender: 'M',
      height: '163',
      weight: '60',
      diagnosis_name: '진단명예시',
    },
    reservation: {
      id,
      location: '병원',
      road_address: '서울시 무슨구 무슨무슨로 10 무슨무슨병원 몇층 몇몇호',
      detail_address: '상세주소 예시',
      start_date: today,
      end_date: oneweekafter,
      weekday: [0, 2, 6],
      start_time: '09:00',
      end_time: '18:00',
      wage: '15000',
    },
  };

  const mateList = [
    {
      mate_id: 'kim',
      mate_name: '테스트성명',
      gender: 'F',
      birthday: '1994-01-12',
      address: '서울시 중구',
      main_service: '외출동행, 목욕, 요리, 청소, 재활운동보조, 빨래, 운전',
      wage: 17800,
      profile_picture_filename: '',
      introduction:
        '잘 부탁드립니다. 100자 제한 걸어둘 거니까 이것도 100자는 보여야 할 텐데 100자가 어느 정도지? 까지가 60자 정도니까 100자는 대충 두 줄 정도를 더 먹겠구나 여기까지',
      tel: '0505-1234-1234',
      rate: 4.5,
      care_times: 4,
    },
    {
      mate_id: 'park',
      mate_name: '테스트성명2',
      gender: 'M',
      birthday: '1991-07-04',
      address: '서울시 성북구',
      main_service: '빨래, 운전',
      wage: 32000,
      profile_picture_filename: '',
      introduction: '',
      rate: 3.9,
      care_times: 21,
    },
  ];

  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const handleShowModal = async (defaultData) => {
    // const combinedData = { ...defaultData, ...(await getModalData(defaultData.mate_id)) };
    const combinedData = {
      ...defaultData,
      ...{
        contact_time_start: '09:00',
        contact_time_end: '22:00',
        career: [
          {
            title: '경력 01',
            date_start: '2020-01-01',
            date_end: '2022-12-31',
          },
          {
            title: '경력 02',
            date_start: '2023-07-01',
            date_end: '2023-12-14',
          },
        ],
        certificate: [
          {
            certificate_name: '자격증 01',
            qualification_date: '2019-02-22',
            expired_date: '2029-02-22',
          },
          {
            certificate_name: '자격증 02',
            qualification_date: '2016-04-02',
            expired_date: '2021-04-02',
          },
        ],
      },
    };
    setModalData(combinedData);
    openModal();
  };

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

  const handleConfirm = ($id) => {
    alert($id);
  };

  return (
    <div className={styles.PendingReservationCard}>
      <ReservationPatientInfo styles={styles} resData={dummydata.reservation} id={id} />
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
