import React from 'react';

const Care = ({ formData, setFormData, setChangedData }) => {
  // DB 초기값을 사용하기 편한 상태로 정리
  const defaultCareOptions = {};
  Object.keys(formData?.careAvailabilityDTO).forEach((e) => (defaultCareOptions[e] = formData.careAvailabilityDTO[e]));
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        careAvailabilityDTO: {
          ...prevData.careAvailabilityDTO,
          [name]: value,
        },
      };
    });

    setChangedData((prevData) => {
      return {
        ...prevData,
        careAvailabilityDTO: {
          ...prevData.careAvailabilityDTO,
          [name]: value,
        },
      };
    });
  };

  const careLabelList = {
    unconsciousness_care: '의식없는 환자 케어',
    meal_care: '식사 보조',
    toilet_care: '용변 보조',
    paralysis_care: '마비 상태',
    behavioral_care: '거동 상태',
    bedsore_care: '욕창 관리',
    use_suction: '석션',
    outpatient_care: '외부 동행',
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
            defaultChecked={defaultCareOptions[name] === 'Y'}
            onChange={handleChange}
          />
          <label htmlFor={`${name}_y`}>가능</label>{' '}
          <input
            type='radio'
            name={name}
            id={`${name}_n`}
            value='n'
            defaultChecked={defaultCareOptions[name] === 'N'}
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
