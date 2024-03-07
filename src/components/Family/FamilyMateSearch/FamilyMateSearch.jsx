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
        mate_id: 'kim',
        mate_name: '추천 메이트 1',
        gender: 'F',
        birthday: '1964-01-12',
        address: '서울시 서초구',
        main_service: '목욕, 재활운동보조',
        wage: 9900,
        profile_picture_filename: '',
        introduction: '안녕하세요',
        rate: 4.9,
        care_times: 40,
      },
      {
        mate_id: 'lee',
        mate_name: '추천 메이트 2',
        gender: 'M',
        birthday: '1981-07-04',
        address: '서울시 강남구',
        main_service: '요리',
        wage: 189000,
        profile_picture_filename: '',
        introduction: '두 줄 짜리 소개글을 작성해 봅시다. 3줄 0줄 1줄이 있으니 2줄짜리도 있어야 체크가 되겠지요.',
        rate: 3.0,
        care_times: 331,
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
    console.log($condition);
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
        <SearchResult data={searchData} type='search' />
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
