import React from 'react';
import { useRouter } from 'next/router';

import usePatientList from '@/services/apis/usePatientList';

const PatientSelector = ({ patientInfo, setPatientInfo, setFormData }) => {
  const navigator = useRouter();
  const { patientList } = usePatientList();

  const handlePatientSelectChange = (e) => {
    if (e.target.value === 'add') {
      if (patientInfo) {
        if (!window.confirm('입력된 내용이 초기화됩니다. 환자 추가 페이지로 이동하시겠습니까?')) {
          return false;
        }
      }
      navigator.push('/family/addpatient');
    } else {
      const selectedPatient = patientList.filter((v) => v.id === +e.target.value)[0];
      setPatientInfo(selectedPatient);
      setFormData((prevData) => ({
        ...prevData,
        patient_id: selectedPatient?.id,
      }));
    }
  };

  return (
    <div className='input_wrapper'>
      <label>간병받을 환자</label>
      <select onChange={handlePatientSelectChange}>
        <option>환자 선택</option>
        {patientList?.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name} ({e.diagnosis_name})
          </option>
        ))}
        <option value='add'>새로운 환자 추가하기</option>
      </select>
    </div>
  );
};

export default PatientSelector;
