import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Loading from '@/components/Common/Modal/Loading';

const MateJobSearch = () => {
  const [condition, setCondition] = useState({});

  const requestCondition = useMemo(() => {
    return {
      ...condition,
      gender: Object.keys(condition.gender).filter((e) => condition.gender[e]),
      weekdays: condition.weekdays.reduce((acc, e, i) => (e ? [...acc, i] : acc), []),
    };
  }, [condition]);

  const {
    data: searchData,
    isError,
    isLoading,
  } = useQuery(
    ['searchData', requestCondition],
    async () => {
      console.log('request params', requestCondition);
      const { data } = await axiosInstance.get('/api/v1/search/recruitment', { params: requestCondition });
      return data;
    },
    {
      enabled: Object.keys(requestCondition).length > 0,
      retry: 0,
    },
  );

  const handleSearch = ($condition) => {
    setCondition($condition);
  };

  return (
    <div className='MateJobSearch content_wrapper'>
      {isLoading && <Loading />}
      <SearchForm onSearch={handleSearch} />
      {(searchData || isError) && (
        <SearchResult data={searchData} errorMessage={isError ? '검색에 실패했습니다.' : '검색 조건을 입력하세요.'} />
      )}
    </div>
  );
};

export default MateJobSearch;
