import { useRouter } from 'next/router';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

import { calAge, genderToKo } from '@/utils/calculators';

const PatientDetailModal = ({ modalData, closeModal }) => {
  const router = useRouter();

  const { handleContentClick } = useModal();
  const isFromRecruitment = router.asPath.includes('/reservation');

  const getModalDataValue = (key) => {
    const prefixedKey = `patient_${key}`;
    return isFromRecruitment && modalData.hasOwnProperty(prefixedKey) ? modalData[prefixedKey] : modalData[key];
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {getModalDataValue('consciousness_state') ? (
          <>
            <h2>{getModalDataValue('name')}님의 환자 정보</h2>
            <div className={styles.info_section}>
              <h5>환자 기본정보</h5>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>진단명</label>
                <span>{getModalDataValue('diagnosis_name')}</span>
              </div>

              <div className={styles.info_grid}>
                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>나이</label>
                  <span>만 {calAge(getModalDataValue('birthday'))}세</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>성별</label>
                  <span>{genderToKo(getModalDataValue('gender'))}성</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>키</label>
                  <span>{getModalDataValue('height')} cm</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>몸무게</label>
                  <span>{getModalDataValue('weight')} kg</span>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.info_section}>
              {/* 상세정보 시작 */}
              <h5>환자 상세정보</h5>
              <div className={styles.info_grid}>
                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>의식 상태</label>
                  <span>{getModalDataValue('consciousness_state')}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>식사 보조</label>
                  <span>{getModalDataValue('meal_care_state')}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>용변 보조</label>
                  <span>{modalData.toilet_care_state}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>마비 상태</label>
                  <span>{getModalDataValue('paralysis_state')}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>거동 상태</label>
                  <span>{getModalDataValue('behavioral_state')}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>욕창</label>
                  <span>{getModalDataValue('is_bedsore') === 'Y' ? '있음' : '없음'}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>석션</label>
                  <span>{getModalDataValue('need_suction') === 'Y' ? '있음' : '없음'}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>주기적 외래 진료</label>
                  <span>{getModalDataValue('need_outpatient') === 'Y' ? '있음' : '없음'}</span>
                </div>

                <div className={`${styles.info_wrapper} ${styles.double}`}>
                  <label>야간 간병 필요</label>
                  <span>{getModalDataValue('need_night_care') === 'Y' ? '있음' : '없음'}</span>
                </div>
              </div>
              <div className={`${styles.info_wrapper} ${styles.double}`}>
                <label>비고</label>
                <span className={styles.introduction}>{getModalDataValue('notice')}</span>
              </div>
              {/* 상세정보 끝 */}
            </div>

            <div className={styles.button_wrapper}>
              <button type='button' onClick={() => navigator.push(`/family/addpatient/${modalData.id}`)}>
                정보 수정하기
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

export default PatientDetailModal;
