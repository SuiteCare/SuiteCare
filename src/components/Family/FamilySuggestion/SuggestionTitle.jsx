import React, { useState } from 'react';
import { useRouter } from 'next/router';

import usePatientList from '@/services/apis/usePatientList';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './Suggestion.module.css';
import Loading from '@/components/Common/Modal/Loading';
import { PatientInfo } from '../FamilyRecruitment/PatientInfo';

const SuggestionTitle = () => {
  const navigator = useRouter();
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
    <div className={`${styles.suggestion} content_wrapper`}>
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
        <form>
          <div className={styles.grid_wrapper}>
            <div className={styles.patient_info_wrapper}>
              <PatientInfo patientBasic={patientInfo} styles={styles} navigator={navigator} id={patientInfo.id} />
            </div>
          </div>
        </form>
      ) : (
        <div style={{ textAlign: 'center' }}>간병인 추천 받을 환자를 선택하세요.</div>
      )}
    </div>
  );
};

export default SuggestionTitle;
