import { useRouter } from 'next/router';
import React from 'react';

import { calAge, genderToKo } from '@/utils/calculators';

const PatientData = ({ styles, patientData, patientDetailData }) => {
  const navigator = useRouter();

  return (
    <div>
      <div className={styles.info_section}>
        <h5>환자 기본정보</h5>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>성함</label>
          <span>{patientData.name}</span>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>진단명</label>
          <span>{patientData.diagnosis_name}</span>
        </div>

        <div className={styles.info_grid}>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>나이</label>
            <span>만 {calAge(patientData.birthday)}세</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>성별</label>
            <span>{genderToKo(patientData.gender)}성</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>키</label>
            <span>{patientData.height} cm</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>몸무게</label>
            <span>{patientData.weight} kg</span>
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
            <span>{patientDetailData.consciousness_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>식사 보조</label>
            <span>{patientDetailData.meal_care_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>용변 보조</label>
            <span>{patientDetailData.toilet_care_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>마비 상태</label>
            <span>{patientDetailData.paralysis_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>거동 상태</label>
            <span>{patientDetailData.behavioral_state}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>욕창</label>
            <span>{patientDetailData.is_bedsore === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>석션</label>
            <span>{patientDetailData.need_suction === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>주기적 외래 진료</label>
            <span>{patientDetailData.need_outpatient === 'Y' ? '있음' : '없음'}</span>
          </div>

          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label>야간 간병 필요</label>
            <span>{patientDetailData.need_night_care === 'Y' ? '있음' : '없음'}</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>비고</label>
          <span className={styles.introduction}>{patientDetailData.notice}</span>
        </div>
        {/* 상세정보 끝 */}
      </div>
      <div className={styles.button_wrapper}>
        <button type='button' onClick={() => navigator.push(`/family/addpatient/${patientDetailData.id}`)}>
          정보 수정하기
        </button>
      </div>
    </div>
  );
};

export default PatientData;
