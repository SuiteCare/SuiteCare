import React, { useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Loading from '@/components/Common/Modal/Loading';

const MateJobSearch = () => {
  const [condition, setCondition] = useState({});

  const {
    data: searchData,
    isError,
    isLoading,
  } = useQuery(
    ['searchData', condition],
    async () => {
      console.log('request params', condition);
      const { data } = await axiosInstance.get('/api/v1/search/recruitment', { params: condition });
      return data;
    },
    {
      enabled: Object.keys(condition).length > 0,
      retry: 0,
    },
  );

  const handleSearch = async ($condition) => {
    setCondition({
      ...$condition,
      weekdays: $condition.weekdays.reduce((acc, e, i) => (e ? [...acc, i] : acc), []),
    });
  };

  return (
    <div className='MateJobSearch content_wrapper'>
      {isLoading && <Loading />}
      <SearchForm onSearch={handleSearch} />
      {searchData ? (
        <SearchResult data={searchData} />
      ) : (
        <div className='no_result'>{isError ? '검색에 실패했습니다.' : '검색 조건을 입력하세요.'}</div>
      )}
    </div>
  );
};

export default MateJobSearch;
