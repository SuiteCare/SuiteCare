import React, { useState } from 'react';

import useAlert from '@/hooks/useAlert';
import useModal from '@/hooks/useModal';
import axiosInstance from '@/services/axiosInstance';

import styles from '@/components/Common/Modal/Modal.module.css';

import { weekdayDic } from '@/utils/calculators.js';
import StarRating from '@/utils/StarRating';

const AddReviewModal = ({ modalData, closeModal }) => {
  const { handleContentClick } = useModal();
  const { openAlert, alertComponent } = useAlert();

  const dataDayArr = modalData.detailData.weekday?.split(',') ?? [];

  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');

  const handleReview = async () => {
    const body = {
      recruitment_id: modalData.reviewData.recruitment_id,
      reservation_id: modalData.reviewData.id,
      mate_resume_id: modalData.reviewData.mate_resume_id,
      rate: rating,
      comment: comment,
    };

    console.log('body : ', body);

    try {
      const { data } = await axiosInstance.post('/api/v1/review', body);
      if (data.code === 200) {
        openAlert('리뷰 등록 완료');
        setTimeout(closeModal(), 2000);
      }
    } catch (error) {
      const messages = {
        400: '오류로 리뷰 등록에 실패했습니다.',
        409: '이미 작성된 리뷰입니다.',
      };
      const { code } = error.response.data;
      openAlert(messages[code]);
      setTimeout(closeModal(), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setComment(value);
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      {alertComponent}
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>

        <h2>리뷰 등록</h2>

        <div className={styles.info_section}>
          <h5>선택한 예약 정보</h5>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>간병인</label>
            <span>{modalData.reviewData.mate_name}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>진단명</label>
            <span>{modalData.patientData.patient_diagnosis_name}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>간병기간</label>
            <span>
              {modalData.reviewData.start_date} ~ {modalData.reviewData.end_date}
            </span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>간병 요일</label>
            <span> {dataDayArr.map((e) => weekdayDic[e]).join(', ')}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>간병 장소</label>
            <span>
              <span>{modalData.detailData.location}</span>
            </span>
          </div>
        </div>

        <br />
        <div className={styles.info_section}>
          <h5>후기 등록하기</h5>
          <div className={`${styles.info_wrapper} ${styles.double} `}>
            <label>별점</label>

            <div className={styles.starRating}>
              <StarRating rate={rating} /> {/* 선택한 별점을 StarRating 컴포넌트에 전달 */}
              <input
                type='range'
                min='1'
                max='5'
                step='1' // 별점을 1 단위로 선택할 수 있도록 설정
                value={rating}
                onChange={(e) => setRating(e.target.value)} // 슬라이더의 값을 변경할 때 마다 rate 상태 업데이트
              />
            </div>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>리뷰</label>
            <textarea
              placeholder='후기 작성'
              name='comment'
              id='comment'
              maxLength='100'
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.button_wrapper}>
            {modalData.reviewData.review_id ? (
              <button type='button' onClick={() => closeModal(true)}>
                닫기
              </button>
            ) : (
              <button type='button' onClick={handleReview}>
                리뷰 등록
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
