import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import tablestyles from '@/components/Common/ManageTable.module.css';
import styles from './PendingReservation.module.css';
import MateDetailModal from './MateDetailModal';
import Loading from '@/components/Common/Modal/Loading';

import { calAge, genderToKo } from '@/utils/calculators.js';

const OfferMateForm = ({ selectedRecId }) => {
  const { isModalVisible, openModal } = useModal();

  const [maModalData, setMaModalData] = useState({});
  const [selectedModal, setSelectedModal] = useState(null);
  const [modalType, setModalType] = useState(null);

  const closeModal = () => {
    // 모달을 보이지 않게 하기 위해 상태를 초기화
    setSelectedModal(null);
  };
  const {
    data: offerMateList,
    isError: isOfferMateListError,
    isLoading: isOfferMateListLoading,
  } = useQuery(
    ['offerMateList', selectedRecId],
    async () => {
      const { data: offerMateData } = await axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/F`, {
        params: {
          recruitment_id: selectedRecId,
        },
      });
      const { code, result } = offerMateData;

      if (code === 200) {
        console.log('offerMateList', selectedRecId, offerMateData);

        return result;
      }
    },
    {
      enabled: Boolean(selectedRecId),
    },
  );

  useEffect(() => {
    console.log('offerMateList', offerMateList);
  }, [offerMateList]);

  const getOfferMateDetail = async (mateId) => {
    console.log(mateId);
    try {
      const offerMateDetailPromise = axiosInstance.get(`/api/v1/mate/resume/${mateId}`);
      const offerMateDataPromise = axiosInstance.get(`/api/v1/recruitment/${selectedRecId}/F`);

      const [offerMateDetailResponse, offerMateDataResponse] = await Promise.all([
        offerMateDetailPromise,
        offerMateDataPromise,
      ]);

      const matchedMate = offerMateDataResponse.data.result.find((mate) => mate.mate_resume_id === mateId);

      if (offerMateDetailResponse.data.code === 200 && offerMateDataResponse.data.code === 200) {
        setMaModalData((prevData) => ({
          ...prevData,
          ...offerMateDetailResponse.data.result[0],
          matchedMate: matchedMate ?? {},
        }));

        console.log('ma', maModalData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOfferMateDetailClick = (mateId) => {
    getOfferMateDetail(mateId);
    openModal();
    setSelectedModal('OfferMateDetail');
    setModalType('Offer');
  };

  return (
    <div className={tablestyles.ManageTable}>
      {isOfferMateListLoading && <Loading />}
      <table className={styles.table_margin}>
        <thead>
          <tr>
            <th>아이디</th>
            <th>성명</th>
            <th>성별</th>
            <th>나이</th>
            <th>주요 서비스</th>
            <th>상태</th>
            <th>간병인 상세정보</th>
          </tr>
        </thead>
        <tbody>
          {offerMateList?.length === undefined ? (
            <tr>
              <td colSpan={6}>
                <div className='error'>내가 제안한 간병인이 없습니다.</div>
              </td>
            </tr>
          ) : (
            offerMateList?.map((e) => (
              <tr key={e.mate_resume_id}>
                <td>{e.mate_resume_id}</td>
                <td>{e.name}</td>
                <td>{genderToKo(e.gender)}성</td>
                <td> 만 {calAge(e.birthday)}세</td>
                <td>{e.mainservice}</td>
                <td>{e.status === 'P' ? '검토중' : '예약 확정'}</td>
                <td>
                  <button type='button' onClick={() => handleOfferMateDetailClick(e.mate_resume_id)}>
                    상세정보 보기
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalVisible && selectedModal === 'OfferMateDetail' && (
        <MateDetailModal modalData={maModalData} closeModal={closeModal} modalType={modalType} />
      )}
    </div>
  );
};

export default OfferMateForm;
