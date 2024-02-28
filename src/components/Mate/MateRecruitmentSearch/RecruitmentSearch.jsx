import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Loading from '@/components/Common/Modal/Loading';

const MateJobSearch = () => {
  const [formData, setFormData] = useState({ gender: { F: false, M: false }, weekdays: Array(7).fill(false) });

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
      console.log('request params', requestParams);
      const { data } = await axiosInstance.get('/api/v1/search/recruitment', { params: requestParams });
      return data;
    },
    {
      enabled: Object.keys(requestParams).length > 2,
      retry: 0,
    },
  );

  const handleSearch = ($formData) => {
    setFormData($formData);
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
