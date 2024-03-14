import React from 'react';

import { calAge, genderToKo } from '@/utils/calculators';

const ModalPatientTab = ({ modalData }) => {
  return (
    <>
      <div className='input_wrapper'>
        <label>환자 정보</label>
        {modalData.detail.patient.patient_name} ({calAge(modalData.detail.patient.patient_birthday)}세{' '}
        {genderToKo(modalData.detail.patient.patient_gender)}성)
      </div>
      <div className='input_wrapper'>
        <label>진단명</label>
        {modalData.detail.patient.patient_diagnosis_name}
      </div>
      <div className='input_wrapper'>
        <label>키 / 몸무게</label>
        {modalData.detail.patient.patient_height} cm / {modalData.detail.patient.patient_weight} kg
      </div>
      <hr />
      <div className='input_wrapper'>
        <label>거동 상태</label>
        {modalData.detail.patient.patient_behavioral_state}
      </div>
      <div className='input_wrapper'>
        <label>의식 상태</label>
        {modalData.detail.patient.patient_consciousness_state}
      </div>
      <div className='input_wrapper'>
        <label>욕창</label>
        {modalData.detail.patient.patient_is_bedsore === 'Y' ? '있음' : '없음'}
      </div>
      <div className='input_wrapper'>
        <label>식사 보조</label>
        {modalData.detail.patient.patient_meal_care_state}
      </div>
      <div className='input_wrapper'>
        <label>야간 간병</label>
        {modalData.detail.patient.patient_need_night_care === 'Y' ? '필요' : '불필요'}
      </div>
      <div className='input_wrapper'>
        <label>주기적 외래 진료</label>
        {modalData.detail.patient.patient_need_outpatient === 'Y' ? '있음' : '없음'}
      </div>
      <div className='input_wrapper'>
        <label>석션</label>
        {modalData.detail.patient.patient_need_suction === 'Y' ? '필요' : '불필요'}
      </div>

      <div className='input_wrapper'>
        <label>마비 상태</label>
        {modalData.detail.patient.patient_paralysis_state}
      </div>
      <div className='input_wrapper'>
        <label>용변 보조</label>
        {modalData.detail.patient.patient_toilet_care_state}
      </div>

      <div className='input_wrapper'>
        <label>비고</label>
        <div>{modalData.detail.patient.patient_notice}</div>
      </div>
    </>
  );
};

export default ModalPatientTab;
