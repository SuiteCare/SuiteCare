import React from 'react';

const Care = ({ formData, setFormData, setChangedData }) => {
  // DB 초기값을 사용하기 편한 상태로 정리
  const defaultCareOptions = {};
  formData.careList.forEach((e) => (defaultCareOptions[e.name] = e.value));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        care: {
          ...prevData.care,
          [name]: value,
        },
      };
    });

    setChangedData((prevData) => {
      return {
        ...prevData,
        care: {
          ...prevData.care,
          [name]: value,
        },
      };
    });
  };

  const careLabelList = {
    consciousness_state: '의식없는 환자 케어',
    meal_care_state: '식사 보조',
    toilet_care_state: '용변 보조',
    paralasys_state: '마비 상태',
    behavioral_state: '거동 상태',
    bedsore: '욕창 관리',
    suction: '석션',
    outpatient: '외부 동행',
    night_care: '야간 간병',
  };

  const renderCareRadioSet = (name) => {
    return (
      <div className='input_wrapper' key={name}>
        <label>{`${careLabelList[name]}`}</label>

        <div key={name}>
          <input
            type='radio'
            name={name}
            id={`${name}_y`}
            value='y'
            defaultChecked={defaultCareOptions[name] === 'y'}
            onChange={handleChange}
          />
          <label htmlFor={`${name}_y`}>가능</label>{' '}
          <input
            type='radio'
            name={name}
            id={`${name}_n`}
            value='n'
            defaultChecked={defaultCareOptions[name] === 'n'}
            onChange={handleChange}
          />
          <label htmlFor={`${name}_n`}>불가능</label>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>환자 케어 가능 여부</h3>

      <div className='grid grid-cols-2'>{Object.keys(careLabelList).map((e) => renderCareRadioSet(e))}</div>
    </div>
  );
};

export default Care;
