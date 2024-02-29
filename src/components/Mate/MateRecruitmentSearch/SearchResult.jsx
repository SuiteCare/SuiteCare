import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import RecruitmentDetailModal from './RecruitmentDetailModal';

const SearchResult = ({ data }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const [sortOption, setSortOption] = useState('');
  const [recruitId, setRecruitId] = useState();
  const [modalData, setModalData] = useState({});

  const { id } = useLoginInfo();

  const {
    data: patientDetail,
    isError,
    isLoading,
  } = useQuery(
    ['patientDetail', recruitId],
    async () => {
      const { data } = await axiosInstance.get(`/api/v1/recruitment/${recruitId}/patient`);
      return data;
    },
    {
      enabled: Boolean(recruitId),
    },
  );

  useEffect(() => {
    if (recruitId) {
      setModalData((prev) => ({
        ...prev,
        ...patientDetail,
      }));
    }
  }, [patientDetail, recruitId]);

  const handleShowModal = (eachData) => {
    setRecruitId(eachData.id);
    setModalData({
      ...eachData,
    });
    openModal();
  };

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

  const sortedData = data && [...data].sort(sortOptions[sortOption]);

  const MateJobApplication = async (body) => {
    const response = await axiosInstance.get(`/api/v1/apply/${body.recruitment_id}`);
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

  const handleApply = (recruitmentId) => {
    const body = {
      mate_id: id,
      recruitment_id: recruitmentId,
    };
    mutation.mutate(body);
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <div className={styles.search_header}>
        <h3>검색 결과 ({data ? data.length : 0}건)</h3>
        <select value={sortOption} onChange={handleSortChange}>
          <option value=''>기본 정렬</option>
          <option value='start_date_asc'>시작일 오름차순</option>
          <option value='start_date_desc'>시작일 내림차순</option>
          <option value='wage_asc'>시급 오름차순</option>
          <option value='wage_desc'>시급 내림차순</option>
        </select>
      </div>
      <div className={styles.card_wrapper}>
        {sortedData?.length > 0 ? (
          sortedData?.map((eachData) => (
            <SearchResultCard
              data={eachData}
              key={eachData.id}
              showDetail={() => handleShowModal(eachData)}
              handleApply={handleApply}
            />
          ))
        ) : (
          <div className='no_result'>검색 결과가 없습니다.</div>
        )}
      </div>
      {isModalVisible && (
        <RecruitmentDetailModal modalData={modalData} closeModal={closeModal} handleApply={handleApply} />
      )}
    </div>
  );
};

export default SearchResult;
