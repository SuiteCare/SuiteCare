import React, { useState } from 'react';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';

import { calAge, calTimeDiff, countWeekdays, genderToKo, weekdayDic } from '@/utils/calculators.js';

const RecruitmentDetailModal = ({ modalData, closeModal, handleApply }) => {
  const { handleContentClick } = useModal();
  const [activeTab, setActiveTab] = useState(0);

  const dataDayArr = modalData.day.split(',');
  const [startTime, endTime] = [modalData.start_time.slice(0, 5), modalData.end_time.slice(0, 5)];

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>

        {/* 시작 */}
        <div className='tab_wrapper'>
          <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            간병 정보
          </div>
          <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            환자 정보
          </div>
        </div>

        {activeTab === 0 && (
          <>
            <div className={styles.info_section}>
              <h5>보호자 정보</h5>
              <div className={`${styles.info_wrapper} ${styles.single}`}>
                <label>연락처</label>
                <div>
                  <p>
                    📞{`${modalData.tel.slice(0, 3)}-${modalData.tel.slice(3, 7)}-****` || '전화번호 정보가 없습니다.'}
                  </p>
                  <p>📧{modalData.email || modalData.mateResume?.email || '이메일 정보가 없습니다.'}</p>
                </div>
              </div>
            </div>
            <hr />
            {/* 간병 정보 시작 */}
            <div className={styles.info_section}>
              <h5>간병 정보</h5>

              <div className={`${styles.info_wrapper} ${styles.single}`}>
                <label>간병지 주소</label>
                <div>
                  <span
                    className={`${styles.location} ${modalData.location === '자택' ? styles.home : styles.hospital}`}
                  >
                    {modalData.location}
                  </span>
                  <span>{modalData.road_address}</span>
                </div>
              </div>
              <div className={`${styles.info_wrapper} ${styles.single}`}>
                <label>간병 기간</label>
                <span>
                  {modalData.start_date} ~ {modalData.end_date}{' '}
                  <span>(총 {countWeekdays(modalData.start_date, modalData.end_date, dataDayArr)}일)</span>
                </span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.single}`}>
                <label>간병 요일</label>
                <span> {dataDayArr.map((e) => weekdayDic[e]).join(', ')}</span>
              </div>

              <div className={`${styles.info_wrapper} ${styles.single}`}>
                <label>출퇴근시간</label>
                <span>
                  {startTime} ~ {endTime} <span>(총 {calTimeDiff(startTime, endTime)}시간)</span>
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
                    calTimeDiff(startTime, endTime) *
                    countWeekdays(modalData.start_date, modalData.end_date, dataDayArr)
                  ).toLocaleString()}
                  원
                </span>
              </div>
            </div>

            {/* 간병 정보 끝 */}
          </>
        )}

        {activeTab === 1 && (
          <>
            <div className={styles.info_section}>
              <h5>환자 기본정보</h5>
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
          </>
        )}
        {/* 끝 */}

        <div className={styles.button_wrapper}>
          {handleApply && (
            <button type='submit' onClick={() => handleApply(modalData.id)}>
              간병 지원하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetailModal;
