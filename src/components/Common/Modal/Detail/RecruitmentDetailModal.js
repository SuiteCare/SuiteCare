import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

import { weekdayDic } from '@/utils/calculators.js';

const RecruitmentDetailModal = ({ reModalData, closeModal }) => {
  const { handleContentClick } = useModal();

  const dataDayArr = reModalData.weekday?.split(',') ?? [];
  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {reModalData.location ? (
          <>
            <h2>{reModalData.patient_name}님의 간병 공고 정보</h2>
            <div className={styles.info_section}>
              <h5>등록된 공고 정보</h5>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>진단명</label>
                <span>{reModalData.patient_diagnosis_name}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병기간</label>
                <span>
                  {reModalData.start_date} ~ {reModalData.end_date}
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 요일</label>
                <span> {dataDayArr.map((e) => weekdayDic[e]).join(', ')}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 시간</label>
                <span>
                  {reModalData.start_time} ~ {reModalData.end_time}
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 장소</label>
                <span>
                  <span>{reModalData.location}</span>
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>간병 주소</label>
                <span>
                  {reModalData.road_address} [{reModalData.address_detail}]
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>제시 시급</label>
                <span>{reModalData.wage}원</span>
              </div>
            </div>
            <div className={styles.button_wrapper}>
              <button type='button' onClick={() => closeModal(true)}>
                닫기
              </button>
            </div>
          </>
        ) : (
          <div className='error'>오류가 발생했습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentDetailModal;
