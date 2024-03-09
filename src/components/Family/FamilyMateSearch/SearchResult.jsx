import React, { useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import MateDetailModal from './MateDetailModal';

const SearchResult = ({ data }) => {
  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const mutation = useMutation(async ($mateId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/mate/resume/${$mateId}`);
      const msg = response.headers.get('msg');
      if (response.data) {
        return response.data;
      }
      if (msg === 'fail') {
        console.log('데이터 불러오기 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  });

  const handleShowModal = ($mateInfo) => {
    console.log($mateInfo);
    mutation.mutate($mateInfo.id);
    mutation.isSuccess && setModalData({ ...$mateInfo, ...mutation.data });
    mutation.data && openModal();
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      {data && data.length > 0 ? (
        data.map((e) => <SearchResultCard data={e} key={e.id} showDetail={() => handleShowModal(e)} />)
      ) : (
        <div className='no_result'>검색 조건을 입력하세요.</div>
      )}
      {isModalVisible && <MateDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default SearchResult;
