import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import MateDetailModal from '../../Common/Modal/Detail/MateDetailModal';
import SelectRecruitmentModal from './SelectRecruitmentModal';

const SearchResult = ({ data, patientInfo }) => {
  const [mateDetailModalData, setMateDetailModalData] = useState(null);
  const {
    isModalVisible: isMateDetailModalVisible,
    openModal: openMateDetailModal,
    closeModal: closeMateDetailModal,
  } = useModal();
  const {
    isModalVisible: isRecruitmentModalVisible,
    openModal: openRecruitmentModal,
    closeModal: closeRecruitmentModal,
  } = useModal();

  const mutation = useMutation(async ($mateInfo) => {
    try {
      const response = await axiosInstance.get(`/api/v1/mate/resume/${$mateInfo.id}`);
      const msg = response.headers.get('msg');
      if (response.data) {
        setMateDetailModalData({ ...$mateInfo, ...response.data });
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
      openMateDetailModal();
    }
  }, [mutation.isSuccess]);

  const [selectedMate, setSelectedMate] = useState(null);
  const handleApply = ($mateInfo) => {
    isMateDetailModalVisible && closeMateDetailModal();
    setSelectedMate({ name: $mateInfo.name, id: $mateInfo.id });
    openRecruitmentModal();
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      {data && data.length > 0 ? (
        data.map((e) => (
          <SearchResultCard
            data={e}
            key={e.id}
            showDetail={() => handleShowModal(e)}
            handleApply={() => handleApply(e)}
          />
        ))
      ) : (
        <div className='no_result'>검색 조건을 입력하세요.</div>
      )}
      {isMateDetailModalVisible && (
        <MateDetailModal modalData={mateDetailModalData} handleApply={handleApply} closeModal={closeMateDetailModal} />
      )}
      {isRecruitmentModalVisible && (
        <SelectRecruitmentModal
          selectedMate={selectedMate}
          patientId={patientInfo?.id || null}
          closeModal={closeRecruitmentModal}
        />
      )}
    </div>
  );
};

export default SearchResult;
