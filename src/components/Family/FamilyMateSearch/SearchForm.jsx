import { useState } from 'react';
import styles from './SearchForm.module.css';
import FormLocationList from './FormLocationList';
import FormWageList from './FormWageList';
import FormAgeList from './FormAgeList';

const SearchForm = ({ onSearch }) => {
  const [checkedItems, setCheckedItems] = useState({
    location: [],
    gender: [],
    service: [],
    age: [],
    wage: [],
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setCheckedItems({
        ...checkedItems,
        [name]: [...checkedItems[name], value],
      });
    } else {
      setCheckedItems({
        ...checkedItems,
        [name]: checkedItems[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptyData = ($obj) => {
      for (let i in $obj) {
        if ($obj[i].length > 0) {
          return false;
        }
      }
      return true;
    };

    if (isEmptyData(checkedItems)) {
      alert('검색 조건을 선택하세요.');
    } else {
      console.log(checkedItems);
      onSearch(checkedItems);
    }
  };

  return (
    <div className={`${styles.SearchForm} Form_wide`}>
      <div className='title_wrapper'>
        <h1 className='title'>원하는 간병인 찾기</h1>
        <span className='description'>나와 꼭 맞는 조건의 간병인을 검색할 수 있습니다.</span>
      </div>

      <form name='search_form' onSubmit={handleSubmit}>
        <div className='input_wrapper'>
          <label>활동 지역</label>
          <div className={styles.checkbox_list_wrapper}>
            <FormLocationList onChange={handleCheckboxChange} />
          </div>
        </div>{' '}
        <hr />
        <div className='input_wrapper'>
          <label>간병인 성별</label>
          <div className={styles.checkbox_list_wrapper}>
            <div className={styles.checkbox_wrapper}>
              <input type='checkbox' name='gender' value={'F'} onChange={handleCheckboxChange} />
              <span>여자</span>
            </div>
            <div className={styles.checkbox_wrapper}>
              <input type='checkbox' name='gender' value={'M'} onChange={handleCheckboxChange} />
              <span>남자</span>
            </div>
          </div>
        </div>
        <hr />
        <div className='input_wrapper'>
          <label>대표서비스</label>
          <div className={styles.checkbox_list_wrapper}>
            {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((e, i) => (
              <div className={styles.checkbox_wrapper} key={i}>
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
          <div className={styles.checkbox_list_wrapper}>
            <FormWageList onChange={handleCheckboxChange} />
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
