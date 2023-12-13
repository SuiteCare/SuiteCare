import { React, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import SuggestionList from './SuggestionList';

const FamilyMateSearch = () => {
  const [searchData, setSearchData] = useState({});

  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <div className='FamilyMateSearch'>
      <SearchForm onSearch={handleSearch} />
      <SearchResult data={searchData} />
      <SuggestionList />
    </div>
  );
};

export default FamilyMateSearch;
