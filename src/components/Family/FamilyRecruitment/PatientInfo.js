import { useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import Loading from '@/components/Common/Modal/Loading';

import { calAge, genderToKo } from '@/utils/calculators';

export const PatientInfo = ({ patientBasic, styles, navigator, id }) => {
  const [activeTab, setActiveTab] = useState(0);

  const {
    data: patientDetail,
    isError,
    isLoading,
  } = useQuery(
    ['patientDetail', id],
    async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/patientDetail/${id}`);
        const { code, result } = response.data;
        if (code === 200) {
          return result[0];
        }
        return [];
      } catch (error) {
        console.error(error);
      }
    },
    {
      enabled: Boolean(id),
    },
  );

  return (
    <>
      <div className='tab_wrapper'>
        <div onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
          환자 기본정보
        </div>
        <div onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
          환자 상세정보
        </div>
      </div>

      <div className={styles.patient_info}>
        {isLoading && <Loading />}
        {activeTab === 0 && (
          <div className={styles.info_section}>
            <h3>환자 기본정보</h3>

            <div className='input_wrapper'>
              <label>성명</label>
              <span>{patientBasic.name}</span>
            </div>

            <div className='input_wrapper'>
              <label>진단명</label>
              <span>{patientBasic.diagnosis_name}</span>
            </div>

            <div className={styles.info_grid}>
              <div className='input_wrapper'>
                <label>나이</label>
                <span>만 {calAge(patientBasic.birthday)}세</span>
              </div>

              <div className='input_wrapper'>
                <label>성별</label>
                <span>{genderToKo(patientBasic.gender)}성</span>
              </div>

              <div className='input_wrapper'>
                <label>키</label>
                <span>{patientBasic.height} cm</span>
              </div>

              <div className='input_wrapper'>
                <label>몸무게</label>
                <span>{patientBasic.weight} kg</span>
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
                <span>{patientDetail?.consciousness_state}</span>
              </div>

              <div className='input_wrapper'>
                <label>식사 보조</label>
                <span>{patientDetail?.meal_care_state}</span>
              </div>

              <div className='input_wrapper'>
                <label>용변 보조</label>
                <span>{patientDetail?.toilet_care_state}</span>
              </div>

              <div className='input_wrapper'>
                <label>마비 상태</label>
                <span>{patientDetail?.paralysis_state}</span>
              </div>

              <div className='input_wrapper'>
                <label>거동 상태</label>
                <span>{patientDetail?.behavioral_state}</span>
              </div>

              <div className='input_wrapper'>
                <label>욕창</label>
                <span>{patientDetail?.is_bedsore === 'Y' ? '있음' : '없음'}</span>
              </div>

              <div className='input_wrapper'>
                <label>석션</label>
                <span>{patientDetail?.need_suction === 'Y' ? '있음' : '없음'}</span>
              </div>

              <div className='input_wrapper'>
                <label>주기적 외래 진료</label>
                <span>{patientDetail?.need_outpatient === 'Y' ? '있음' : '없음'}</span>
              </div>

              <div className='input_wrapper'>
                <label>야간 간병 필요</label>
                <span>{patientDetail?.need_night_care === 'Y' ? '있음' : '없음'}</span>
              </div>
            </div>
            <div className='input_wrapper'>
              <label>비고</label>
              <span className={styles.introduction}>{patientDetail?.notice}</span>
            </div>
            {/* 상세정보 끝 */}
          </div>
        )}

        <div className='button_wrapper'>
          <button
            type='button'
            onClick={() =>
              window.confirm('입력된 내용이 초기화됩니다. 환자 정보 수정 페이지로 이동하시겠습니까?')
                ? navigator.push(`/family/addpatient/${id}`)
                : ''
            }
          >
            정보 수정하기
          </button>
        </div>
      </div>
    </>
  );
};
