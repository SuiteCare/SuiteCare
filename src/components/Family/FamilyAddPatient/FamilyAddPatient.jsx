import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './addPatient.module.css';
import formInputInfos from './FormInputInfos';

import random from '@/utils/FamilyAddPatient';

const FamilyAddPatient = ({ idQuery }) => {
  const navigator = useRouter();

  const { id } = useLoginInfo();

  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    gender: '',
    height: '',
    weight: '',
    diagnosis_name: '',
    consciousness_state: '',
    paralysis_state: '',
    behavioral_state: '',
    meal_care_state: '',
    toilet_care_state: '',
    is_bedsore: '',
    need_suction: '',
    need_outpatient: '',
    need_night_care: '',
    notice: '',
  });

  // 정보 받아옴
  const getPatientData = async () => {
    try {
      const patientPromise = axiosInstance.get(`/api/v1/patient/${idQuery}`, {
        params: { id: idQuery },
      });
      const patientDetailPromise = axiosInstance.get(`/api/v1/patientDetail/${idQuery}`, {
        params: { id: idQuery },
      });

      const [patientResponse, patientDetailResponse] = await Promise.all([patientPromise, patientDetailPromise]);

      setFormData({
        ...patientResponse.data,
        ...patientDetailResponse.data,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioWrapperClick = (typeName, optionValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [typeName]: optionValue,
    }));
  };

  const renderInput = (typeName) => {
    const inputInfo = formInputInfos[typeName];
    return (
      <div key={typeName} className='input_wrapper'>
        <label>{inputInfo.label}</label>
        {inputInfo.type === 'radio' ? (
          <div>
            {inputInfo.options.map((option) => (
              <div
                className={styles.radio_wrapper}
                key={option.value}
                onClick={() => handleRadioWrapperClick(typeName, option.value)}
              >
                <input
                  type='radio'
                  id={option.id}
                  name={typeName}
                  value={option.value}
                  onChange={() => handleRadioWrapperClick(typeName, option.value)}
                  checked={formData[typeName] === option.value}
                  required
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <input
            type={inputInfo.type}
            placeholder={inputInfo.label}
            name={typeName}
            id={inputInfo.id}
            maxLength={inputInfo.maxLength}
            value={formData[typeName]}
            onChange={handleInputChange}
            required
          />
        )}
      </div>
    );
  };

  // 정보 백엔드로 전달
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      member_id: id,
      ...formData,
    };
    console.log(body);

    try {
      const response = idQuery
        ? await axiosInstance.patch(`/api/v1/patient/${idQuery}`, body)
        : await axiosInstance.post('/api/v1/patient', body);

      if (response.data === 1) {
        if (idQuery) {
          alert(`${body.name} 님의 환자 정보가 수정되었습니다.`);
          if (window.confirm(`${body.name} 님의 환자 정보가 등록되었습니다. 환자 목록으로 이동하시겠습니까?`)) {
            navigator.push('/family/manage/patient_list');
          }
          navigator.push('/family/main');
        } else {
          alert(`${body.name} 님의 환자 정보가 등록되었습니다.`);
          navigator.push('/family/main');
        }
      } else if (idQuery) {
        alert('환자 정보 수정에 실패하였습니다.');
      } else {
        alert('환자 정보 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('요청을 처리하는 중 오류가 발생했습니다.');
    }
  };

  // 정보 삭제
  const handleClickDelete = async (e) => {
    e.preventDefault();

    await axiosInstance
      .delete(`/api/v1/patient/${idQuery}`, {
        params: { id: idQuery },
      })
      .then((res) => {
        if (res.data === 1) {
          alert(`${formData.basic.name} 님의 환자 정보가 삭제되었습니다.`);
          navigator.push('/family/manage/patient_list');
        } else {
          alert('환자 정보 삭제에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (e) => random(e, formData, setFormData); // 테스트용 코드

  useEffect(() => {
    if (idQuery) getPatientData();

    document.addEventListener('keydown', handleKeyPress); // 테스트용 코드

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // 테스트용 코드
    };
  }, [idQuery]);

  return (
    <div className={`${styles.addPatient} content_wrapper`}>
      <form name='addPatient' onSubmit={handleSubmit}>
        <h3>환자 기본 정보</h3>
        <div className={styles.info_grid}>
          <div>
            {renderInput('name')}
            {renderInput('gender')}
            {renderInput('birthday')}
          </div>
          <div>
            {renderInput('height')}
            {renderInput('weight')}
            {renderInput('diagnosis_name')}
          </div>
        </div>
        <hr />
        <h3>환자 상세 정보</h3>
        <div className={`${styles.info_grid} ${styles.detail}`}>
          <div>
            {renderInput('consciousness_state')}
            {renderInput('meal_care_state')}
            {renderInput('toilet_care_state')}
          </div>
          <div>
            {renderInput('paralysis_state')}
            {renderInput('behavioral_state')}
            {renderInput('is_bedsore')}
          </div>
          <div>
            {renderInput('need_suction')}
            {renderInput('need_outpatient')}
            {renderInput('need_night_care')}
          </div>
        </div>
        <div className='input_wrapper'>
          <label>비고</label>
          <textarea
            type='text'
            placeholder='비고'
            name='notice'
            id='notice'
            maxLength='200'
            onChange={handleInputChange}
            defaultValue={formData.notice}
          />
        </div>
        <div className='button_wrapper'>
          {idQuery ? (
            <>
              <button type='button' onClick={handleClickDelete}>
                환자 삭제
              </button>
              <button type='submit'>정보 수정</button>
            </>
          ) : (
            <button type='submit'>환자 등록</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FamilyAddPatient;
