import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import styles from './addPatient.module.css';
import formInputInfos from './FormInputInfos';

const Form = () => {
  const navigator = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const submitData = {
      ...formData,
      family_id: JSON.parse(sessionStorage.getItem('login_info')).login_id,
    };
    const response = await axios
      .post('/api/v1/patient', submitData)
      .then((response) => {
        if (response.data === 2) {
          alert(`${formData.name} 님의 환자 정보가 등록되었습니다.`);
          navigator.push('/family/main');
        } else if (response.data === 1) {
          alert('환자 정보 등록에 일부 실패하였습니다.');
        } else {
          alert('환자 정보 등록에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === '`') {
      const randomData = { ...formData };

      const names = [
        '김',
        '이',
        '박',
        '최',
        '정',
        '강',
        '조',
        '윤',
        '장',
        '임',
        '한',
        '오',
        '서',
        '신',
        '권',
        '황',
        '안',
        '송',
        '전',
        '홍',
        '문',
        '손',
        '양',
        '배',
        '백',
        '허',
        '남',
        '심',
        '노',
        '하',
        '곽',
        '성',
        '차',
        '주',
        '우',
        '구',
        '나',
        '민',
        '유',
        '류',
        '진',
        '엄',
        '채',
        '원',
        '천',
        '방',
        '공',
        '현',
        '함',
        '변',
        '염',
        '여',
        '추',
        '도',
        '소',
        '석',
        '마',
        '가',
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      randomData.name = randomName + '환자';

      const randomHeight = Math.floor(Math.random() * 101) + 100;
      randomData.height = randomHeight.toString();

      const randomWeight = Math.floor(Math.random() * 91) + 30;
      randomData.weight = randomWeight.toString();

      const diagnoses = ['진단명1', '진단명2', '진단명3'];
      const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
      randomData.diagnosis_name = randomDiagnosis;

      const randomYear = Math.floor(Math.random() * 80) + 1924;
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 31) + 1;
      const formattedRandomBirth = `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(
        2,
        '0',
      )}`;
      randomData.birthday = formattedRandomBirth;

      for (const key in randomData) {
        if (formInputInfos[key].type === 'radio') {
          const radioOptions = formInputInfos[key].options;
          const randomOption = radioOptions[Math.floor(Math.random() * radioOptions.length)].value;
          randomData[key] = randomOption;
        }
      }

      setFormData(randomData);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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
