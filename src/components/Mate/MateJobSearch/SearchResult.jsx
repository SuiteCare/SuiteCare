import { React, useState, useEffect } from 'react';
import axios from 'axios';

import useModal from '@/hooks/useModal';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import JobDetailModal from './JobDetailModal';

const SearchResult = ({ data }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [sortOption, setSortOption] = useState('');
  const [modalData, setModalData] = useState({});

  const handleShowModal = async (defaultData) => {
    const getPatientDetail = async () => {
      if (typeof window !== 'undefined') {
        try {
          const [response1, response2] = await Promise.all([
            axios.get(`/api/v1/patient/${defaultData.patient_id}`),
            axios.get(`/api/v1/patientDetail/${defaultData.patient_id}`),
          ]);

          setModalData({
            ...defaultData,
            ...response1.data,
            ...response2.data,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    getPatientDetail();
  };

  useEffect(() => {
    if (Object.keys(modalData).length > 0) {
      openModal();
    }
  }, [modalData]);

  const sortOptions = {
    wage_asc: (a, b) => a.wage - b.wage,
    wage_desc: (a, b) => b.wage - a.wage,
    start_date_asc: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    start_date_desc: (a, b) => new Date(b.start_date) - new Date(a.start_date),
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  const sortedData = [...data].sort(sortOptions[sortOption]);

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <div className={styles.search_header}>
        <h3>검색 결과 ({data.length ? data.length : 0}건)</h3>
        <select value={sortOption} onChange={handleSortChange}>
          <option value=''>정렬 없음</option>
          <option value='start_date_asc'>시작일 오름차순</option>
          <option value='start_date_desc'>시작일 내림차순</option>
          <option value='wage_asc'>시급 오름차순</option>
          <option value='wage_desc'>시급 내림차순</option>
        </select>
      </div>
      <div className={styles.card_wrapper}>
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <SearchResultCard data={item} key={item.id} showDetail={() => handleShowModal(item)} />
          ))
        ) : (
          <div className={styles.no_result}>검색 결과가 없습니다.</div>
        )}
      </div>
      {isModalVisible && <JobDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default SearchResult;
