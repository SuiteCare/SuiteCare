import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import SuggestionList from './SuggestionList';

const FamilyMateSearch = () => {
  const [searchCondition, setSearchCondition] = useState({});
  const [searchData, setSearchData] = useState({});

  const handleSearch = async ($condition) => {
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
      <SearchResult data={searchData} />
      <SuggestionList />
    </div>
  );
};

export default FamilyMateSearch;
