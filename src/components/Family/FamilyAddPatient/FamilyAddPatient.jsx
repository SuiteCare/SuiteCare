import { useState } from 'react';

import styles from './addPatient.module.css';
import formInputInfos from './FormInputInfos';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    gender: '',
    height: '',
    weight: '',
    diagnosis: '',
    consciousness_state: '',
    paralysis_state: '',
    mobility_state: '',
    notice: '',
    care_meal_yn: '',
    care_toilet_yn: '',
    bedsore_yn: '',
    suction_yn: '',
    outpatient_yn: '',
    night_care_yn: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioWrapperClick = (typeName, optionValue) => {
    setFormData({ ...formData, [typeName]: optionValue });
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
                  onChange={handleInputChange}
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className={`${styles.addPatient} content_wrapper`}>
      <form name='addPatient' onSubmit={handleSubmit}>
        <h3>환자 기본 정보</h3>
        <div className={styles.info_grid}>
          <div>
            {renderInput('name')}
            {renderInput('gender')}
            {renderInput('birth')}
          </div>
          <div>
            {renderInput('height')}
            {renderInput('weight')}
            {renderInput('diagnosis')}
          </div>
        </div>
        <hr />
        <h3>환자 상세 정보</h3>
        <div className={`${styles.info_grid} ${styles.detail}`}>
          <div>
            {renderInput('consciousness_state')}
            {renderInput('care_meal_yn')}
            {renderInput('care_toilet_yn')}
          </div>
          <div>
            {renderInput('paralysis_state')}
            {renderInput('mobility_state')}
            {renderInput('bedsore_yn')}
          </div>
          <div>
            {renderInput('suction_yn')}
            {renderInput('night_care_yn')}
            {renderInput('outpatient_yn')}
          </div>
        </div>
        {/* {renderInput('notice')} */}
        <div className='input_wrapper'>
          <label>비고</label>
          <textarea
            type='text'
            placeholder='비고'
            name='notice'
            id='notice'
            maxLength='200'
            onChange={handleInputChange}
          />
        </div>
        <div className='button_wrapper'>
          <input type='submit' value='환자 등록' />
        </div>
      </form>
    </div>
  );
};

export default Form;
