import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

const MateDetailModal = ({ maModalData, closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {maModalData.mateResume ? (
          <>
            <h2>간병 지원자 {maModalData.matchedMate.name}님의 정보</h2>
            <div className={styles.info_section}>
              <h5>등록된 공고 정보</h5>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <span>{maModalData.matchedMate.profile_picture_filename}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>아이디</label>
                <span>{maModalData.matchedMate.mate_resume_id}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>전화번호</label>
                <span>{maModalData.matchedMate.tel}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>이메일</label>
                <span>{maModalData.matchedMate.email}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>연락 가능 시간</label>
                <span>
                  {maModalData.matchedMate.contact_time_start} ~ {maModalData.matchedMate.contact_time_end}
                </span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>성별</label>
                <span>
                  <span>{maModalData.matchedMate.gender}</span>
                </span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>연령</label>
                <span>
                  <span>{maModalData.matchedMate.birthday}</span>
                </span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>활동 지역</label>
                <span>{maModalData.matchedMate.location}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>주요 서비스</label>
                <span>{maModalData.matchedMate.mainservice}</span>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>보유 자격증</label>
                <ul>
                  {maModalData.certificateList.map((certificate) => (
                    <li key={certificate.id}>
                      {certificate.name} - {certificate.qualification_date}
                    </li>
                  ))}
                </ul>
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

export default MateDetailModal;
