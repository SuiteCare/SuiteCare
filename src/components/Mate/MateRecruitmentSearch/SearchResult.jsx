import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';
import useAlert from '@/hooks/useAlert';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import RecruitmentDetailModal from './RecruitmentDetailModal';

const SearchResult = ({ data }) => {
  const { openAlert, alertComponent } = useAlert();

  const { isModalVisible, openModal, closeModal } = useModal();
  const [recruitId, setRecruitId] = useState();
  const [modalData, setModalData] = useState({});
  const { id } = useLoginInfo();
  const router = useRouter();

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
    if (recruitId && patientDetail) {
      setModalData((prev) => ({ ...prev, ...patientDetail }));
    }
  }, [patientDetail, recruitId]);

  const handleShowModal = (eachData) => {
    setRecruitId(eachData.id);
    setModalData({ ...eachData });
    openModal();
  };

  const MateJobApplication = async (body) => {
    try {
      const { data } = await axiosInstance.post('/api/v1/apply', body);
      if (!data) {
        openAlert('오류가 발생했습니다. 간병 지원에 실패했습니다.');
        throw new Error('No data received');
      }
      if (data.code === 200) {
        return openAlert('간병 지원이 완료되었습니다.');
      }
      return openAlert('오류가 발생했습니다.');
    } catch (error) {
      const { code } = error.response.data;

      const messages = {
        404: '간병 지원을 위해서는 메이트 이력서 작성이 필요합니다.',
        409: '이미 지원한 공고입니다.',
        default: '오류가 발생했습니다. 간병 지원에 실패했습니다.',
      };

      if (
        code === 404 &&
        window.confirm(`간병 지원을 위해서는 메이트 이력서 작성이 필요합니다.\n이력서 작성 페이지로 이동하시겠습니까?`)
      ) {
        router.push('/mate/mypage/resume');
      }
      openAlert(messages[code] || messages.default);

      throw error;
    }
  };

  const mutation = useMutation(MateJobApplication);

  const handleApply = (recruitmentId) => {
    const body = {
      request_by: 'M',
      mate_id: id,
      recruitment_id: recruitmentId,
    };
    mutation.mutate(body);
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      {alertComponent}

      <div className={styles.card_wrapper}>
        {data?.length > 0 ? (
          data?.map((eachData) => (
            <SearchResultCard
              data={eachData}
              key={eachData.id}
              showDetail={() => handleShowModal(eachData)}
              handleApply={handleApply}
            />
          ))
        ) : (
          <div className='no_result'>{isError ? '검색에 실패했습니다.' : '검색 결과가 없습니다.'}</div>
        )}
      </div>
      {isModalVisible && (
        <RecruitmentDetailModal
          modalData={modalData}
          closeModal={closeModal}
          handleApply={handleApply}
          alertComponent={alertComponent}
        />
      )}
    </div>
  );
};

export default SearchResult;
