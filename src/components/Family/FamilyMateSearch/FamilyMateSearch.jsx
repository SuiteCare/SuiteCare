import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import Loading from '@/components/Common/Modal/Loading';

const FamilyMateSearch = () => {
  const [patientInfo, setPatientInfo] = useState();

  const [suggestionData, setSuggestionData] = useState({});

  const getSuggestionData = () => {
    console.log('서버와 통신한다고 가정');
  };

  useEffect(() => {
    console.log('patientInfo', patientInfo);
    // setSuggestionData(getSuggestionData())
    setSuggestionData([
      {
        id: 'suggested',
        name: '추천 메이트',
        tel: '01012342134',
        email: 'asdfasdf@gmail.com',
        profile_picture_filename: 'default_profile.jpg',
        introduction: '추천 메이트입니다.',
        contact_time_start: '09:00',
        contact_time_end: '21:00',
        desired_wage: '9860',
        gender: 'F',
        birthday: '1960-06-06',
        location: '강남구,강동구,강북구,강서구,동작구',
        mainservice: '목욕,요리,운전',
        care_times: 123,
        rate: 4.2,
      },
    ]);
  }, [patientInfo]);

  const [condition, setCondition] = useState({});

  const {
    data: searchData,
    isError,
    isLoading,
  } = useQuery(
    ['searchData', condition],
    async () => {
      console.log('request params', condition);
      const { data } = await axiosInstance.get('/api/v1/search/mate', { params: condition });
      return data;
    },
    {
      enabled: Object.keys(condition).length > 0,
      retry: 0,
    },
  );

  const handleSearch = async ($condition) => {
    setCondition($condition);
  };

  const renderSearchMessage = () => {
    if (searchData && searchData.length > 0) {
      return `${searchData.length}명의 메이트님을 찾았습니다. 지금 간병을 신청해 보세요!`;
    }
    return '나에게 꼭 맞는 메이트님을 찾아보세요!';
  };

  return (
    <div className='FamilyMateSearch content_wrapper'>
      {isLoading && <Loading />}

      <SearchForm onSearch={handleSearch} patientInfo={patientInfo} setPatientInfo={setPatientInfo} />
      <h3>{renderSearchMessage()}</h3>
      {isError ? (
        <div className='no_result'>검색에 실패했습니다.</div>
      ) : (
        <SearchResult data={searchData} patientInfo={patientInfo} type='search' />
      )}
      {patientInfo ? (
        <div style={{ marginTop: '6rem' }}>
          <h3>스위트케어가 추천하는 메이트</h3>
          <SearchResult data={suggestionData} type='suggestion' />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FamilyMateSearch;
