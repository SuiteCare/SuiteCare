import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import styles from './addPatient.module.css';
import formInputInfos from './FormInputInfos';

import random from '@/utils/FamilyAddPatient';

const FamilyAddPatient = ({ idQuery }) => {
  const navigator = useRouter();

  const [formData, setFormData] = useState({
    basic: {
      name: '',
      birthday: '',
      gender: '',
      height: '',
      weight: '',
      diagnosis_name: '',
    },
    detail: {
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
    },
  });

  const getPatientData = async () => {
    try {
      const patientPromise = axios.get(`/api/v1/patient/${idQuery}`, { params: { id: idQuery } });
      const patientDetailPromise = axios.get(`/api/v1/patientDetail/${idQuery}`, { params: { id: idQuery } });

      const [patientResponse, patientDetailResponse] = await Promise.all([patientPromise, patientDetailPromise]);

      setFormData({
        basic: { ...patientResponse.data },
        detail: { ...patientDetailResponse.data },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isBasic = formInputInfos[name]?.basic;

    setFormData((prevData) => ({
      basic: { ...prevData.basic, ...(isBasic ? { [name]: value } : {}) },
      detail: { ...prevData.detail, ...(isBasic ? {} : { [name]: value }) },
    }));
  };

  const handleRadioWrapperClick = (typeName, optionValue) => {
    const isBasic = formInputInfos[typeName]?.basic;

    setFormData(({ basic, detail }) => ({
      basic: { ...basic, ...(isBasic ? { [typeName]: optionValue } : {}) },
      detail: { ...detail, ...(isBasic ? {} : { [typeName]: optionValue }) },
    }));
  };

  const renderInput = (typeName) => {
    const inputInfo = formInputInfos[typeName];
    const formDataSection = inputInfo.basic ? formData.basic : formData.detail;

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
                  checked={formDataSection[typeName] === option.value}
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
            value={formDataSection[typeName]}
            onChange={handleInputChange}
            required
          />
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const basicRequestData = {
      family_id: JSON.parse(sessionStorage.getItem('login_info')).login_id,
      ...formData.basic,
    };

    const detailRequestData = {
      ...formData.detail,
    };

    console.log(basicRequestData, detailRequestData);

    const response = idQuery
      ? await axios
          .patch(`/api/v1/patient/${idQuery}`, { patientDTO: basicRequestData, patientDetailDTO: detailRequestData })
          .then((response) => {
            if (response.data === 1) {
              alert(`${formData.name} 님의 환자 정보가 수정되었습니다.`);
              navigator.push('/family/manage/patient_list');
            } else {
              alert('환자 정보 수정에 실패하였습니다.');
            }
          })
          .catch((error) => {
            console.error(error);
          })
      : await axios
          .post('/api/v1/patient', { patientDTO: basicRequestData, patientDetailDTO: detailRequestData })
          .then((response) => {
            if (response.data === 1) {
              alert(`${formData.basic.name} 님의 환자 정보가 등록되었습니다.`);
              navigator.push('/family/main');
            } else {
              alert('환자 정보 등록에 실패하였습니다.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`/api/v1/patient/${idQuery}`, { params: { id: idQuery } })
      .then((response) => {
        if (response.data === 1) {
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

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
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
            defaultValue={formData.detail.notice}
          />
        </div>
        <div className='button_wrapper'>
          {idQuery ? (
            <>
              <button type='button' onClick={handleClickDelete}>
                삭제
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
