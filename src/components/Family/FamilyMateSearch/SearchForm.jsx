import { useState } from 'react';

import styles from './SearchForm.module.css';
import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';
import FormAgeList from '@/components/Common/SearchInfo/FormAgeList';
import PatientSelector from './PatientSelector';

import { minWage } from '@/utils/calculators';

const SearchForm = ({ onSearch, patientInfo, setPatientInfo }) => {
  // 체크박스 및 최종 데이터 관련
  const [formData, setFormData] = useState({
    search_id: '',
    search_diagnosis: '',
    location: [],
    gender: [],
    service: [],
    age: [],
    wage: [minWage, 1000000],
  });

  // 시급 관련
  const [wages, setWages] = useState([minWage, 1000000]);

  const handleWageChange = (e, index) => {
    const newWages = [...wages];
    newWages[index] = +e.target.value;
    setWages(newWages);
  };

  const updateWage = () => {
    const newWages = [...wages];

    if (newWages[0] < minWage) {
      alert(`최소 시급은 2024년 기준 최저임금 ${minWage.toLocaleString()}원 이상이어야 합니다.`);
      newWages[0] = minWage;
    }

    if (newWages[0] > newWages[1]) {
      alert('최대 시급은 최소 시급보다 높아야 합니다.');
      newWages[1] = newWages[0];
    }

    setWages(newWages);
    setFormData({
      ...formData,
      wage: newWages,
    });
  };

  // 상단 텍스트 검색창 관련
  const [searchName, setSearchName] = useState('');

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setFormData({
      ...formData,
      search_id: e.target.value,
    });
  };
  const [searchDiagnosis, setSearchDiagnosis] = useState('');

  const handleSearchDiagnosisNameChange = (e) => {
    setSearchDiagnosis(e.target.value);
    setFormData({
      ...formData,
      search_diagnosis: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const selectAllLocation = (e) => {
    const allLocationCheckboxes = Array.from(document.getElementsByName('location'));
    const isChecked = allLocationCheckboxes.filter((checkbox) => checkbox.checked === false).length === 0;

    const selectedLocations = isChecked ? [] : allLocationCheckboxes.map((checkbox) => checkbox.value);

    allLocationCheckboxes.forEach((checkbox) => {
      checkbox.checked = !isChecked;
    });

    e.target.checked = !isChecked;

    setFormData({
      ...formData,
      location: selectedLocations,
    });
  };

  const handleAllLocationChange = (e) => {
    selectAllLocation(e);
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptyData = ($obj, key) => {
      if ($obj[key].length > 0) {
        return false;
      }
      return true;
    };

    if (isEmptyData(formData, 'location')) {
      alert('활동 지역을 1곳 이상 선택하세요.');
    } else {
      onSearch(formData);
    }
  };

  return (
    <div className={`${styles.SearchForm} Form_wide`}>
      <div className={styles.patient_selector}>
        <PatientSelector patientInfo={patientInfo} setPatientInfo={setPatientInfo} setFormData={setFormData} />
        <span>✔️환자를 선택하시면 스위트케어가 추천하는 메이트를 만나보실 수 있습니다.</span>
      </div>

      <hr />

      <form name='search_form' onSubmit={handleSubmit}>
        <div className='input_wrapper'>
          <label>메이트 아이디 검색</label>
          <input
            type='text'
            name='search_id'
            placeholder='🔎 메이트 아이디로 검색하기'
            value={searchName}
            onChange={handleSearchNameChange}
            maxLength={10}
          />
        </div>
        <div className='input_wrapper'>
          <label>진단명으로 검색</label>
          <input
            type='text'
            name='search_diagnosis'
            placeholder='🔎 진단명으로 검색하기'
            value={searchDiagnosis}
            onChange={handleSearchDiagnosisNameChange}
            maxLength={10}
          />
        </div>
        <hr />
        <div className='input_wrapper'>
          <div>
            <label>활동 지역</label>
          </div>
          <div className={styles.checkbox_list_wrapper}>
            <FormLocationList onChange={handleCheckboxChange} />
          </div>
        </div>{' '}
        <hr />
        <div className='input_wrapper'>
          <label>간병인 성별</label>
          <div className={styles.checkbox_list_wrapper}>
            <div className={styles.checkbox_wrapper}>
              <input type='checkbox' name='gender' value='F' onChange={handleCheckboxChange} />
              <span>여자</span>
            </div>
            <div className={styles.checkbox_wrapper}>
              <input type='checkbox' name='gender' value='M' onChange={handleCheckboxChange} />
              <span>남자</span>
            </div>
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>주요 서비스</label>
          <div className={styles.checkbox_list_wrapper}>
            {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((e) => (
              <div className={styles.checkbox_wrapper} key={e}>
                <input type='checkbox' name='service' value={e} onChange={handleCheckboxChange} />
                <span>{`${e}`}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>간병인 연령대</label>
          <div className={styles.checkbox_list_wrapper}>
            <FormAgeList onChange={handleCheckboxChange} />
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>시급</label>
          <div className={styles.input_wrapper}>
            최소
            <input
              type='number'
              value={wages[0]}
              onChange={(e) => handleWageChange(e, 0)}
              onBlur={updateWage}
              min={minWage}
              max={1000000}
            />
            원 ~ 최대
            <input
              type='number'
              value={wages[1]}
              onChange={(e) => handleWageChange(e, 1)}
              onBlur={updateWage}
              min={minWage}
              max={1000000}
            />
            원
          </div>
        </div>
        <hr />
        <div className={styles.button_wrapper}>
          <button type='submit'>간병인 검색</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
