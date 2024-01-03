import { useState } from 'react';

import { calAge, genderToKo } from '@/utils/calculators';

export const PatientInfo = ({ patientInfo, styles, navigator }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className='tab_wrapper'>
        <ul>
          <li onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            환자 기본정보
          </li>
          <li onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            환자 상세정보
          </li>
        </ul>
      </div>

      {activeTab === 0 && (
        <div className={styles.info_section}>
          <h3>환자 기본정보</h3>

          <div className='input_wrapper'>
            <label>성명</label>
            <span>{patientInfo.name}</span>
          </div>

          <div className='input_wrapper'>
            <label>진단명</label>
            <span>{patientInfo.diagnosis_name}</span>
          </div>

          <div className={styles.info_grid}>
            <div className='input_wrapper'>
              <label>나이</label>
              <span>만 {calAge(patientInfo.birthday)}세</span>
            </div>

            <div className='input_wrapper'>
              <label>성별</label>
              <span>{genderToKo(patientInfo.gender)}성</span>
            </div>

            <div className='input_wrapper'>
              <label>키</label>
              <span>{patientInfo.height} cm</span>
            </div>

            <div className='input_wrapper'>
              <label>몸무게</label>
              <span>{patientInfo.weight} kg</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className={styles.info_section}>
          {/* 상세정보 시작 */}
          <h3>환자 상세정보</h3>
          <div className={styles.info_grid}>
            <div className='input_wrapper'>
              <label>의식 상태</label>
              <span>{patientInfo.consciousness_state}</span>
            </div>

            <div className='input_wrapper'>
              <label>식사 보조</label>
              <span>{patientInfo.meal_care_state}</span>
            </div>

            <div className='input_wrapper'>
              <label>용변 보조</label>
              <span>{patientInfo.toilet_care_state}</span>
            </div>

            <div className='input_wrapper'>
              <label>마비 상태</label>
              <span>{patientInfo.paralysis_state}</span>
            </div>

            <div className='input_wrapper'>
              <label>거동 상태</label>
              <span>{patientInfo.behavioral_state}</span>
            </div>

            <div className='input_wrapper'>
              <label>욕창</label>
              <span>{patientInfo.is_bedsore === 'Y' ? '있음' : '없음'}</span>
            </div>

            <div className='input_wrapper'>
              <label>석션</label>
              <span>{patientInfo.need_suction === 'Y' ? '있음' : '없음'}</span>
            </div>

            <div className='input_wrapper'>
              <label>주기적 외래 진료</label>
              <span>{patientInfo.need_outpatient === 'Y' ? '있음' : '없음'}</span>
            </div>

            <div className='input_wrapper'>
              <label>야간 간병 필요</label>
              <span>{patientInfo.need_night_care === 'Y' ? '있음' : '없음'}</span>
            </div>
          </div>
          <div className='input_wrapper'>
            <label>비고</label>
            <span className={styles.introduction}>{patientInfo.notice}</span>
          </div>
          {/* 상세정보 끝 */}
        </div>
      )}

      <div className='button_wrapper'>
        <button
          type='button'
          onClick={() =>
            window.confirm('입력된 내용이 초기화됩니다. 환자 정보 수정 페이지로 이동하시겠습니까?')
              ? navigator.push(`/family/addpatient/${patientInfo.id}`)
              : ''
          }
        >
          정보 수정하기
        </button>
      </div>
    </>
  );
};
