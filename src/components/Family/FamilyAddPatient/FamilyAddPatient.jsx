import { useState } from 'react';

import styles from './Form.module.css';
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

  const renderInput = (typeName) => {
    const inputInfo = formInputInfos[typeName];
    return (
      <div key={typeName}>
        <label>{inputInfo.label}</label>
        {inputInfo.type === 'radio' ? (
          <div>
            {inputInfo.options.map((option) => (
              <div key={option.value}>
                <input
                  type='radio'
                  id={option.id}
                  name={typeName}
                  value={option.value}
                  onChange={handleInputChange}
                  checked={formData[typeName] === option.value}
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
    <div className={styles.form}>
      <form name='addPatient' onSubmit={handleSubmit}>
        <h2>기본 정보</h2>
        <div>
          {renderInput('name')}
          {renderInput('gender')}
          {renderInput('birth')}
          {renderInput('height')}
          {renderInput('weight')}
          {renderInput('diagnosis')}
        </div>

        <h2>상세 정보</h2>
        {renderInput('consciousness_state')}
        {renderInput('care_meal_yn')}
        {renderInput('care_toilet_yn')}
        {renderInput('bedsore_yn')}
        {renderInput('suction_yn')}
        {renderInput('outpatient_yn')}
        {renderInput('bedsornight_care_yne_yn')}

        {renderInput('paralysis_state')}
        {renderInput('mobility_state')}
        {renderInput('notice')}
        <input type='submit' value='환자 등록' />
        <div></div>
      </form>
    </div>
  );
};

export default Form;
