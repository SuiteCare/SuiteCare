import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useAlert from '@/hooks/useAlert';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Loading from '@/components/Common/Modal/Loading';
import styles from './SearchResult.module.css';

const MateRecruitmentSearch = () => {
  const [formData, setFormData] = useState({ gender: { F: false, M: false }, weekdays: Array(7).fill(false) });
  const [sortOption, setSortOption] = useState('');
  const { openAlert, alertComponent } = useAlert();

  const requestParams = useMemo(() => {
    return {
      ...formData,
      gender: Object.keys(formData.gender).filter((e) => formData.gender[e]),
      weekdays: formData.weekdays.reduce((acc, e, i) => (e ? [...acc, i] : acc), []),
    };
  }, [formData]);

  const {
    data: searchData,
    isError,
    isLoading,
  } = useQuery(
    ['searchData', requestParams],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/search/recruitment', { params: requestParams });
      if (data.code === 200) {
        return data.result;
      }
      openAlert('검색 오류가 발생했습니다.');
    },
    {
      enabled: Object.keys(requestParams).length > 2,
      retry: 0,
    },
  );

  const handleSearch = ($formData) => {
    setFormData({
      ...$formData,
      pathname: window.location.pathname, // 로그데이터
      target: 'search button',
      search_at: new Date().getTime(),
    });
  };

  const renderSearchMessage = () => {
    if (searchData && searchData.length > 0) {
      return `검색 결과 (${searchData ? searchData.length : 0}건)`;
    }
    return '원하는 조건의 공고를 찾아보세요.';
  };

  const sortOptions = {
    wage_asc: (a, b) => a.wage - b.wage,
    wage_desc: (a, b) => b.wage - a.wage,
    start_date_asc: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    start_date_desc: (a, b) => new Date(b.start_date) - new Date(a.start_date),
    expire_at_asc: (a, b) => new Date(a.expire_at) - new Date(b.expire_at),
    expire_at_desc: (a, b) => new Date(b.expire_at) - new Date(a.expire_at),
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  const sortedData = searchData && [...searchData].sort(sortOptions[sortOption]);

  return (
    <div className='MateRecruitmentSearch content_wrapper'>
      {isLoading && <Loading />}
      <SearchForm onSearch={handleSearch} />
      <div className={styles.search_header}>
        <h3>{renderSearchMessage()}</h3>
        <select value={sortOption} onChange={handleSortChange}>
          <option value=''>기본 정렬</option>
          <option value='start_date_asc'>시작일 오름차순</option>
          <option value='start_date_desc'>시작일 내림차순</option>
          <option value='wage_asc'>시급 오름차순</option>
          <option value='wage_desc'>시급 내림차순</option>
          <option value='expire_at_asc'>마감일 오름차순</option>
          <option value='expire_at_desc'>마감일 내림차순</option>
        </select>
      </div>

      {searchData ? (
        <SearchResult data={sortedData} type='search' />
      ) : (
        <div className='no_result'>검색 조건을 입력하세요.</div>
      )}
    </div>
  );
};

export default MateRecruitmentSearch;
