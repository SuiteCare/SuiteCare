import React from 'react';

const SearchResult = ({ data }) => {
  return (
    <div className='SearchResult'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SearchResult;
