import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import MateDetailModal from '../../Common/Modal/Detail/MateDetailModal';

const SearchResult = ({ data }) => {
  const [modalData, setModalData] = useState(null);
  const { isModalVisible, openModal, closeModal } = useModal();

  const mutation = useMutation(async ($mateInfo) => {
    try {
      const response = await axiosInstance.get(`/api/v1/mate/resume/${$mateInfo.id}`);
      const msg = response.headers.get('msg');
      if (response.data) {
        setModalData({ ...$mateInfo, ...response.data });
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
    mutation.mutate($mateInfo);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      openModal();
    }
  }, [mutation.isSuccess]);

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
