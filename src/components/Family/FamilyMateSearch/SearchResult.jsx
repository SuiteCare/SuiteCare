import React, { useState } from 'react';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import MateDetailModal from './MateDetailModal';

const SearchResult = ({ data }) => {
  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const handleShowModal = async (defaultData) => {
    // const combinedData = { ...defaultData, ...(await getModalData(defaultData.mate_id)) };
    const combinedData = {
      ...defaultData,
      ...{
        contact_time_start: '09:00',
        contact_time_end: '22:00',
        careerList: [
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
        certificateList: [
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
      const response = await axiosInstance.get('/api/v1/familymatesearch', { params: $mateId });
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

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      {data && data.length > 0 ? (
        data.map((e) => <SearchResultCard data={e} key={e.mate_id} showDetail={() => handleShowModal(e)} />)
      ) : (
        <div className='no_result'>검색 조건을 입력하세요.</div>
      )}
      {isModalVisible && <MateDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default SearchResult;
