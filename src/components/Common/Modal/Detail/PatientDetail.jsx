import { useRouter } from 'next/router';
import React from 'react';

import { calAge, genderToKo } from '@/utils/calculators';

const PatientDetail = ({ styles, modalData, page }) => {
  const navigator = useRouter();

  return (
    <div>
      <div className={styles.info_section}>
        <h5>환자 기본정보</h5>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>성함</label>
          <span>{modalData.patient_name}</span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>진단명</label>
          <span>{modalData.patient_diagnosis_name}</span>
        </div>

        <div className={styles.info_grid}>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>나이</label>
            <span>만 {calAge(modalData.patient_birthday)}세</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>성별</label>
            <span>{genderToKo(modalData.patient_gender)}성</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>키</label>
            <span>{modalData.patient_height} cm</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>몸무게</label>
            <span>{modalData.patient_weight} kg</span>
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
            <span>{modalData.patient_consciousness_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>식사 보조</label>
            <span>{modalData.patient_meal_care_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>용변 보조</label>
            <span>{modalData.patient_toilet_care_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>마비 상태</label>
            <span>{modalData.patient_paralysis_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>거동 상태</label>
            <span>{modalData.patient_behavioral_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>욕창</label>
            <span>{modalData.patient_is_bedsore === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>석션</label>
            <span>{modalData.patient_need_suction === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>주기적 외래 진료</label>
            <span>{modalData.patient_need_outpatient === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>야간 간병 필요</label>
            <span>{modalData.patient_need_night_care === 'Y' ? '있음' : '없음'}</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>비고</label>
          <span className={styles.introduction}>{modalData.patient_notice}</span>
        </div>
        {/* 상세정보 끝 */}
      </div>
      {page === 'patientList' ? (
        <div className={styles.button_wrapper}>
          <button type='button' onClick={() => navigator.push(`/family/addpatient/${modalData.patient_patient_id}`)}>
            정보 수정하기
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PatientDetail;
