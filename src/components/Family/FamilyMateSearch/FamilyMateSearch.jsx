import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const FamilyMateSearch = () => {
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
    <div className='FamilyMateSearch'>
      <SearchForm onSearch={handleSearch} />
      <SearchResult
        data={[
          {
            userName: '테스트이름',
            gender: 'F',
            birth: '1994-01-12',
            address: '서울시 중구',
            service: '외출동행, 목욕, 요리, 청소, 재활운동보조, 빨래, 운전',
            wage: 17800,
            profile_picture_filename: '',
            introduction:
              '잘 부탁드립니다. 100자 제한 걸어둘 거니까 이것도 100자는 보여야 할 텐데 100자가 어느 정도지? 까지가 60자 정도니까 100자는 대충 두 줄 정도를 더 먹겠구나 여기까지',
          },
          {
            userName: '테스트이름2',
            gender: 'M',
            birth: '1991-07-04',
            address: '서울시 성북구',
            service: '빨래, 운전',
            wage: 32000,
            profile_picture_filename: '',
            introduction: '데이터 추가 테스트',
          },
        ]}
        type={'search'}
      />

      <SearchResult
        data={[
          {
            userName: '추천간병인1',
            gender: 'F',
            birth: '1967-01-12',
            address: '서울시 서초구',
            service: '',
            wage: 9900,
            profile_picture_filename: '',
            introduction: '잘 부탁드립니다.',
          },
          {
            userName: '추천간병인2',
            gender: 'M',
            birth: '1981-07-04',
            address: '',
            service: '빨래, 운전',
            wage: 32000,
            profile_picture_filename: '',
            introduction: '데이터 추가 테스트',
          },
        ]}
        type={'suggestion'}
      />
    </div>
  );
};

export default FamilyMateSearch;
