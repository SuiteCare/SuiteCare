import React, { useState } from 'react';

import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './Suggestion.module.css';
import Loading from '@/components/Common/Modal/Loading';

import { calAge, genderToKo } from '@/utils/calculators';

const SuggestionTitle = () => {
  const [selectedPatient, setSelectedPatient] = useState('');

  const { id } = useLoginInfo();

  const { patientList, isLoading, isError } = usePatientList(id);

  if (isLoading) return <Loading />;
  if (isError) return <div>환자 리스트를 불러오지 못했습니다.</div>;

  const patientInfo = patientList?.find((patient) => patient.id === Number(selectedPatient));

  const handlePatientSelectChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  return (
    <div className={`${styles.Suggestion} content_wrapper`}>
      <div>
        <select value={selectedPatient} onChange={handlePatientSelectChange}>
          <option value=''>환자명</option>
          {patientList?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.diagnosis_name})
            </option>
          ))}
        </select>
      </div>

      <hr />
      {patientInfo ? (
        <div className={styles.info_section}>
          <h3>환자 기본정보</h3>

          <div className={styles.inputWrapper}>
            <label>성명</label>
            <span>{patientInfo.name}</span>
          </div>

          <div className={styles.inputWrapper}>
            <label>진단명</label>
            <span>{patientInfo.diagnosis_name}</span>
          </div>

          <div className={styles.info_grid}>
            <div className={styles.inputWrapper}>
              <label>나이</label>
              <span>만 {calAge(patientInfo.birthday)}세</span>
            </div>

            <div className={styles.inputWrapper}>
              <label>성별</label>
              <span>{genderToKo(patientInfo.gender)}성</span>
            </div>

            <div className={styles.inputWrapper}>
              <label>키</label>
              <span>{patientInfo.height} cm</span>
            </div>

            <div className={styles.inputWrapper}>
              <label>몸무게</label>
              <span>{patientInfo.weight} kg</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>간병인 추천 받을 환자를 선택하세요.</div>
      )}
    </div>
  );
};

export default SuggestionTitle;
