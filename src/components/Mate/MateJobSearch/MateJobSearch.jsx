import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import SearchForm from './JobSearchForm';
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
      const { data } = await axiosInstance.get('/api/v1/search', { params: condition });
      return data;
    },
    {
      enabled: Object.keys(condition).length > 0,
    },
  );

  const handleSearch = async ($condition) => {
    console.log($condition);
    setCondition($condition);
  };

  if (isError) {
    alert('검색 실패');
  }

  return (
    <div className='MateJobSearch content_wrapper'>
      {isLoading ? <Loading /> : ''}
      <SearchForm onSearch={handleSearch} />
      {searchData ? <SearchResult data={searchData} /> : <div className='no_result'>검색 조건을 입력하세요.</div>}
    </div>
  );
};

export default MateJobSearch;
