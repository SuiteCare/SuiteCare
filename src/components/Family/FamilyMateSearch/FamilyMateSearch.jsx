import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const FamilyMateSearch = () => {
  const [searchCondition, setSearchCondition] = useState({});
  const [searchData, setSearchData] = useState({});
  const [suggestionData, setSuggestionData] = useState({});

  const handleSearch = async ($condition) => {
    console.log($condition);
    setSearchCondition($condition);
    setSearchData(await getSearchData(searchCondition));
  };

  async function getSearchData($condition) {
    try {
      const response = await axios.get('/api/v1/familymatesearch', { params: $condition });
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
    <div className='FamilyMateSearch content_wrapper'>
      <SearchForm onSearch={handleSearch} />
      <SearchResult
        data={[
          {
            mate_id: 'kim',
            mate_name: '테스트이름',
            gender: 'F',
            birthday: '1994-01-12',
            address: '서울시 중구',
            main_service: '외출동행, 목욕, 요리, 청소, 재활운동보조, 빨래, 운전',
            wage: 17800,
            profile_picture_filename: '',
            introduction:
              '잘 부탁드립니다. 100자 제한 걸어둘 거니까 이것도 100자는 보여야 할 텐데 100자가 어느 정도지? 까지가 60자 정도니까 100자는 대충 두 줄 정도를 더 먹겠구나 여기까지',
            tel: '0505-1234-1234',
          },
          {
            mate_id: 'park',
            mate_name: '테스트이름2',
            gender: 'M',
            birthday: '1991-07-04',
            address: '서울시 성북구',
            main_service: '빨래, 운전',
            wage: 32000,
            profile_picture_filename: '',
            introduction: '',
          },
        ]}
        type={'search'}
      />

      <SearchResult
        data={[
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
          },
        ]}
        type={'suggestion'}
      />
    </div>
  );
};

export default FamilyMateSearch;
