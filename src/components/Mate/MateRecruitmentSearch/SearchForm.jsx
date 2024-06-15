import React, { useState } from 'react';

import styles from './SearchForm.module.css';
import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

import { minWage, weekdayDic } from '@/utils/calculators';
import TimePicker from '@/utils/TimePicker';
import { wageOptions } from '@/utils/util';

const JobSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    search_input: '',
    location: [],
    gender: { F: false, M: false },
    weekdays: Array(7).fill(true),
    worktime: ['09:00', '18:00'],
    wage: [minWage, 100000],
  });

  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setFormData((prevData) => ({ ...prevData, search_input: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    let { checked } = e.target;

    if (name === 'location') {
      if (checked && formData.location.length > 4) {
        alert('간병 지역은 최대 5개까지 선택할 수 있습니다.');
        e.target.checked = false;
        checked = false;
      }

      setFormData((prevData) => ({
        ...prevData,
        location: checked ? [...prevData.location, value] : prevData.location.filter((item) => item !== value),
      }));
    } else if (name === 'weekdays') {
      setFormData((prevData) => ({
        ...prevData,
        weekdays: prevData.weekdays.map((day, index) => (index.toString() === value ? checked : day)),
      }));
    } else if (name === 'gender') {
      setFormData((prevData) => ({ ...prevData, gender: { ...prevData.gender, [value]: checked } }));
    }
  };

  const handleWeekdayCheckboxWrapperClick = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      weekdays: prevData.weekdays.map((day, i) => (i === index ? !day : day)),
    }));
  };

  const selectAllWeekday = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      weekdays: Array(7).fill(isChecked),
    }));
  };

  const handleWorktimeChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      worktime: type === 0 ? [value, prevData.worktime[1]] : [prevData.worktime[0], value],
    }));
  };

  const handleWageChange = (e, index) => {
    const newWages = [...formData.wage];
    newWages[index] = +e.target.value;
    setFormData((prevData) => ({ ...prevData, wage: newWages }));
  };

  const updateWage = () => {
    const newWages = [...formData.wage];

    if (newWages[0] < minWage) {
      alert(`최소 시급은 2024년 기준 최저임금 ${minWage.toLocaleString()}원 이상이어야 합니다.`);
      newWages[0] = minWage;
    }

    if (newWages[0] > newWages[1]) {
      alert('최대 시급은 최소 시급보다 높아야 합니다.');
      newWages[1] = newWages[0];
    }

    setFormData((prevData) => ({ ...prevData, wage: newWages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptyData = ($obj, key) => {
      if ($obj[key].length > 0) {
        return false;
      }
      return true;
    };

    if (isEmptyData(formData, 'location')) {
      alert('희망 간병 지역을 1곳 이상 선택하세요.');
      return false;
    }
    if (formData.weekdays.every((e) => !e)) {
      alert('희망 출근 요일을 1개 이상 선택하세요.');
      return false;
    }

    // 행동 로그는 onSearch를 전달받을 때 추가
    onSearch(formData);
  };

  return (
    <div className={`${styles.SearchForm} Form_wide`}>
      <form name='search_form' onSubmit={handleSubmit}>
        <div className='input_wrapper'>
          <label>진단명으로 검색</label>
          <input
            type='text'
            name='search_input'
            placeholder='🔎 진단명으로 검색하기'
            value={searchInput}
            onChange={handleInputChange}
            maxLength={10}
          />
        </div>
        <hr />
        <div className='input_wrapper'>
          <div>
            <label>간병 지역</label>
          </div>
          <div className={styles.checkbox_list_wrapper}>
            <FormLocationList onChange={handleCheckboxChange} />
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>환자 성별</label>
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
          <div>
            <label>출퇴근요일</label>
            <div onClick={selectAllWeekday}>
              <input type='checkbox' defaultChecked />
              <span>전체 선택</span>
            </div>
          </div>

          <div className={styles.checkbox_list_wrapper}>
            {formData.weekdays.map((isChecked, index) => (
              <div
                key={weekdayDic[index]}
                className={styles.checkbox_wrapper}
                onClick={() => handleWeekdayCheckboxWrapperClick(index)}
              >
                <input
                  type='checkbox'
                  name='weekdays'
                  value={index}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span>{weekdayDic[index]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>출퇴근 시간</label>
          <div>
            <div className={styles.timepicker_wrapper}>
              <TimePicker
                time={formData?.worktime[0]}
                setTime={(value) => handleWorktimeChange(0, value)}
                start={5}
                end={22}
              />
              이후 출근
            </div>
            <div className={styles.timepicker_wrapper}>
              <TimePicker
                time={formData?.worktime[1]}
                setTime={(value) => handleWorktimeChange(1, value)}
                start={5}
                end={22}
              />
              이전 퇴근
            </div>
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>제시 시급</label>
          <div className={styles.input_wrapper}>
            최소
            <select name='wage' onChange={(e) => handleWageChange(e, 0)}>
              <option value={minWage}>{minWage}</option>
              {wageOptions(10000, 30000, 1000)}
            </select>
            원 ~ 최대
            <select name='wage' onChange={(e) => handleWageChange(e, 1)}>
              <option value={minWage}>{minWage}</option>
              {wageOptions(10000, 30000, 1000)}
            </select>
            원
          </div>
        </div>
        <hr />
        <div className={styles.button_wrapper}>
          <button type='submit'>간병 공고 검색</button>
        </div>
      </form>
    </div>
  );
};

export default JobSearchForm;
