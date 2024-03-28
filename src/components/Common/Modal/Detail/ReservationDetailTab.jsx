import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import MateDetailModal from './MateDetailModal';

import { calTimeDiff, countWeekdays, minWage, normalizeWeekDays, weekdayDic } from '@/utils/calculators';

const ReservationDetailTab = ({ styles, modalData, page }) => {
  const [mateDetailModalData, setMateDetailModalData] = useState();

  const {
    isModalVisible: isMateDetailModalVisible,
    openModal: openMateDetailModal,
    closeModal: closeMateDetailModal,
  } = useModal();

  const mutation = useMutation(
    async ($mateResumeId) => {
      try {
        const [resumeResponse, searchResponse] = await Promise.all([
          axiosInstance.get(`/api/v1/mate/resume/${$mateResumeId}`),
          axiosInstance.get(`/api/v1/search/mate`, {
            search_name: $mateResumeId,
            location: [
              '강남구',
              '강동구',
              '강북구',
              '강서구',
              '관악구',
              '광진구',
              '구로구',
              '금천구',
              '노원구',
              '도봉구',
              '동대문구',
              '동작구',
              '서대문구',
              '서초구',
              '성동구',
              '성북구',
              '송파구',
              '양천구',
              '영등포구',
              '용산구',
              '은평구',
              '종로구',
              '중구',
              '중랑구',
            ],
            gender: [],
            wage: [minWage, 100000],
          }),
        ]);

        const resumeData = resumeResponse.data;
        const searchData = searchResponse.data;

        if (resumeData && searchData) {
          setMateDetailModalData({ ...searchData[0], ...resumeData });
          return { resumeData, searchData: searchData[0] };
        }
        console.log('데이터 불러오기 실패');
        return {};
      } catch (error) {
        console.error('Error occurred while fetching modal data:', error);
        return {};
      }
    },
    {
      onSuccess: () => {
        openDetailModal();
      },
      onError: (error) => {
        console.error('Error occurred while fetching modal data:', error);
      },
    },
  );

  const handleMateDetailButton = () => {
    mutation.mutate(modalData.mate_resume_id);
  };

  useEffect(() => {
    mateDetailModalData && openMateDetailModal();
  }, [mateDetailModalData]);

  const renderMateOrFamilyInfo = () => {
    if (page === 'family') {
      return (
        <>
          <h5>간병인 정보</h5>
          <div className={`${styles.info_wrapper} ${styles.single}`}>
            <label>담당 메이트</label>
            <div className='input_with_button'>
              <span>
                {modalData.mate_resume_id ? `${modalData.mate_name} (${modalData.mate_resume_id})` : '간병인 미배정'}
              </span>
              <button onClick={handleMateDetailButton}>상세정보 보기</button>
            </div>
          </div>
        </>
      );
    }
    if (page === 'mate') {
      return (
        <>
          <h5>보호자 정보</h5>
          <div className={`${styles.info_wrapper} ${styles.single}`}>
            <label>보호자</label>
            <span>
              {modalData.family_name} ({modalData.family_id})
            </span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.single}`}>
            <label>연락처</label>
            <div>
              <p>
                📞
                {modalData.tel
                  ? `${modalData.tel.slice(0, 3)}-${modalData.tel.slice(3, 7)}-${modalData.tel.slice(7)}`
                  : '전화번호 정보가 없습니다.'}
              </p>
              <p>
                📧
                {modalData.email || '이메일 정보가 없습니다.'}
              </p>
            </div>
          </div>
        </>
      );
    }
    return '오류가 발생했습니다.';
  };

  return (
    <>
      {isMateDetailModalVisible && (
        <MateDetailModal modalData={mateDetailModalData} closeModal={closeMateDetailModal} page='calendar' />
      )}
      <div className={styles.info_section}>{renderMateOrFamilyInfo()}</div>

      <hr />

      <div className={styles.info_section}>
        <h5>간병 정보</h5>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병지 주소</label>
          <div>
            <span className={`${modalData.location === '자택' ? styles.home : styles.hospital}`}>
              {modalData.location}
            </span>
            <span>
              {modalData.road_address} {modalData.address_detail}
            </span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 기간</label>
          <span>
            {modalData.start_date} ~ {modalData.end_date}{' '}
            <span>
              (총 {countWeekdays(modalData.start_date, modalData.end_date, normalizeWeekDays(modalData.weekday))}
              일)
            </span>
          </span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>간병 요일</label>
          <span>
            {modalData.weekday
              .split(',')
              .map((e) => weekdayDic[e])
              .join(', ')}
          </span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>출퇴근시간</label>
          <span>
            {modalData.start_time.slice(0, 5)} ~ {modalData.end_time.slice(0, 5)}{' '}
            <span>(총 {calTimeDiff(modalData.start_time, modalData.end_time)}시간)</span>
          </span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>제시 시급</label>
          <span>{modalData.wage.toLocaleString()}원</span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.single}`}>
          <label>예상 총 급여</label>
          <span>
            {(
              modalData.wage *
              calTimeDiff(modalData.start_time, modalData.end_time) *
              countWeekdays(modalData.start_date, modalData.end_date, normalizeWeekDays(modalData.weekday))
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
    </>
  );
};

export default ReservationDetailTab;
