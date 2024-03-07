import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

const MatetDetailModal = ({ maModalData, closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {maModalData ? (
          <>
            <h2>간병 지원자 {maModalData.name}님의 정보</h2>
            <div className={styles.info_section}>
              <h5>등록된 공고 정보</h5>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <span>{maModalData.profile_picture_filename}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>아이디</label>
                <span>{maModalData.mate_resume_id}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>전화번호</label>
                <span>
                  {maModalData.start_date} ~ {maModalData.end_date}
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>이메일</label>
                <span>{maModalData.weekday}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>연락 가능 시간</label>
                <span>
                  {maModalData.contact_time_start} ~ {maModalData.contact_time_end}
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>성별</label>
                <span>
                  <span>{maModalData.gender}</span>
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>연령</label>
                <span>
                  <span>{maModalData.birthday}</span>
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>활동 지역</label>
                <span>{maModalData.location}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>주요 서비스</label>
                <span>{maModalData.mainservice}</span>
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

export default MatetDetailModal;
