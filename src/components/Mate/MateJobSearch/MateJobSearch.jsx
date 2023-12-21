import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './JobSearchForm';
import SearchResult from './SearchResult';

const MateJobSearch = () => {
  const [searchCondition, setSearchCondition] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);

  const handleSearch = async ($condition) => {
    console.log($condition);
    setSearchCondition($condition);
    const data = await getSearchData($condition);
    setSearchData(data);
  };

  async function getSearchData($condition) {
    try {
      const response = await axios.get('/api/v1/matejobsearch', { params: $condition });
      const msg = response.headers.get('msg');
      if (response.status === 200 && msg === 'success') {
        alert(response.data);
        console.log(response.data);
        return response.data;
      } else if (msg === 'fail') {
        alert('검색 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching search data:', error);
      return {};
    }
  }

  return (
    <div className='MateJobSearch content_wrapper'>
      <SearchForm onSearch={handleSearch} />
      <SearchResult
        data={[
          {
            family_name: '테스트',
            family_id: 'test',
            patient_name: '환자명',
            patient_gender: 'F',
            patient_birthday: '1968-01-01',
            location_type: '병원',
            address: '서울시 중구',
            wage: 9860,
            start_date: '2023-12-19',
            end_date: '2023-12-20',
            start_time: '09:00',
            end_time: '17:00',
            week_days: ['화', '수'],
            introduction: '뼈가 약하십니다',
            diagnosis: '중풍',
          },
          {
            family_name: '테스트2',
            family_id: 'test2',
            patient_name: '환자명2',
            patient_gender: 'M',
            patient_birthday: '1948-01-01',
            location_type: '자택',
            address: '서울시 광진구',
            wage: 19860,
            start_date: '2024-01-01',
            end_date: '2025-12-20',
            start_time: '09:00',
            end_time: '17:00',
            week_days: ['금', '토', '일'],
            introduction: '',
            diagnosis: '류마티스성 골절',
          },
          {
            family_name: '테스트',
            family_id: 'test',
            patient_name: '환자명',
            patient_gender: 'F',
            patient_birthday: '1968-01-01',
            location_type: '병원',
            address: '서울시 어쩌구 저쩌구 말줄임 테스트 어디까지 가야 되는거냐',
            wage: 9860,
            start_date: '2023-12-20',
            end_date: '2024-12-20',
            start_time: '09:00',
            end_time: '17:00',
            week_days: ['수'],
            introduction: '뼈가 약하십니다',
            diagnosis: '진단명을 매우 길게 적는 사람도 있지 않을까',
          },
          {
            family_name: '테스트2',
            family_id: 'test2',
            patient_name: '환자명2',
            patient_gender: 'M',
            patient_birthday: '1948-01-01',
            location_type: '자택',
            address: '서울시 광진구',
            wage: 19860,
            start_date: '2025-01-01',
            end_date: '2025-12-20',
            start_time: '09:00',
            end_time: '17:00',
            week_days: ['금', '토', '일'],
            introduction: '',
            diagnosis: '류마티스성 골절',
          },
        ]}
      />
    </div>
  );
};

export default MateJobSearch;
