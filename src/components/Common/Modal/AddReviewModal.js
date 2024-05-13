import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

import { weekdayDic } from '@/utils/calculators.js';
import React, {useState} from "react";
import axiosInstance from "@/services/axiosInstance";
import useAlert from '@/hooks/useAlert';

const AddReviewModal = ({ modalData, closeModal}) => {
  const { handleContentClick } = useModal();
  const { openAlert, alertComponent } = useAlert();

  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const handleReview = async () => {
    const body = {
      recruitment_id: modalData.reviewData.recruitment_id,
      reservation_id : modalData.reviewData.id,
      mate_resume_id:modalData.reviewData.mate_resume_id,
      rate : rating,
      comment : comment
    };

    try {
      const {data} = await axiosInstance.post('/api/v1/review', body);
      if (data.code === 200) {
        openAlert('리뷰 등록 완료');
        setTimeout(closeModal(), 2000);
      }
    } catch (error) {
      const messages = {
        400: '오류로 리뷰 등록에 실패했습니다.',
        409: '이미 작성된 리뷰입니다.',
      };
      const {code} = error.response.data;
      openAlert(messages[code]);
      setTimeout(closeModal(), 2000);
    }
  }

  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (e, index) => {
    let clickStates = clicked;
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setRating(index + 1);
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
          <>
            <h2>리뷰 등록</h2>
            <div>
              <h5>등록된 공고 정보</h5>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병인</label>
                <span>{modalData.reviewData.reservation.mate_name}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>진단명</label>
                <span>{modalData.patientData.patient_diagnosis_name}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병기간</label>
                <span>
                  {modalData.reviewData.reservation.start_date} ~ {modalData.reviewData.reservation.end_date}
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 요일</label>
                <span> {modalData.reviewData.reservation.weekdays.map((e) => weekdayDic[e]).join(', ')}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 장소</label>
                <span>
                  <span>{modalData.detailData.location}</span>
                </span>
              </div>
            </div>
            <form>

              <div>
                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>별점</label>
                  {clicked.map((el, index) => {
                    return (
                        <>
                    <input
                        type="radio"
                        name="rating"
                        value={index}
                        defaultChecked={modalData.reviewData.reviewData?.rate === index+1}
                        id={index}
                        onClick={(e) => handleStarClick(e, index)}
                    />
                    <label htmlFor={index}>
                      {index}
                    </label>
                      </>
                    )
                  })}
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>리뷰</label>
                  {!modalData.reviewData.reviewData ?
                  (
                    <textarea
                        placeholder='리뷰'
                        name='comment'
                        id='comment'
                        maxLength='100'
                        onChange={handleInputChange}
                    />
                  ) :
                  (
                    <span className={styles.introduction}>{modalData.reviewData.reviewData.comment}</span>
                  )
                  }
                </div>
              </div>
              <div className={styles.button_wrapper}>
                {modalData.reviewData.reservation.review_id ?
                    (<button type='button' onClick={() => closeModal(true)}>
                      닫기
                    </button>)
                    : (<button type='button' onClick={handleReview}>
                      리뷰 등록
                    </button>)}

              </div>
            </form>
          </>
      </div>
    </div>
  );
};

export default AddReviewModal;
