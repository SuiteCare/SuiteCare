import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import JobDetailModal from './RecruitmentDetailModal';

const SearchResult = ({ data }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [sortOption, setSortOption] = useState('');
  const [modalData, setModalData] = useState({});

  const { id } = useLoginInfo();

  const handleShowModal = async (defaultData) => {
    const getPatientDetail = async () => {
      if (typeof window !== 'undefined') {
        try {
          const [response1, response2] = await Promise.all([
            axiosInstance.get(`/api/v1/patient/${defaultData.patient_id}`),
            axiosInstance.get(`/api/v1/patientDetail/${defaultData.patient_id}`),
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

  const MateJobApplication = async (body) => {
    const response = await axiosInstance.post('/api/v1/apply', body);
    return response.data;
  };

  const router = useRouter();

  const mutation = useMutation(MateJobApplication, {
    onSuccess: (applicationResult) => {
      if (applicationResult === 1) {
        alert('간병 지원이 완료되었습니다.');
      } else if (applicationResult === 0) {
        if (
          window.confirm(
            '간병 지원을 위해서는 메이트 이력서 작성이 필요합니다.\n이력서 작성 페이지로 이동하시겠습니까?',
          )
        ) {
          router.push('/mate/mypage/resume');
        }
      } else if (applicationResult === 2) {
        alert('이미 지원한 공고입니다.');
      } else {
        alert('오류가 발생했습니다. 간병 지원에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleApply = (reservationId) => {
    const body = {
      mate_id: id,
      reservation_id: reservationId,
    };
    mutation.mutate(body);
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <div className={styles.search_header}>
        <h3>검색 결과 ({data.length ? data.length : 0}건)</h3>
        <select value={sortOption} onChange={handleSortChange}>
          <option value=''>기본 정렬</option>
          <option value='start_date_asc'>시작일 오름차순</option>
          <option value='start_date_desc'>시작일 내림차순</option>
          <option value='wage_asc'>시급 오름차순</option>
          <option value='wage_desc'>시급 내림차순</option>
        </select>
      </div>
      <div className={styles.card_wrapper}>
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <SearchResultCard
              data={item}
              key={item.id}
              showDetail={() => handleShowModal(item)}
              handleApply={handleApply}
            />
          ))
        ) : (
          <div className='no_result'>검색 결과가 없습니다.</div>
        )}
      </div>
      {isModalVisible && <JobDetailModal modalData={modalData} closeModal={closeModal} handleApply={handleApply} />}
    </div>
  );
};

export default SearchResult;
