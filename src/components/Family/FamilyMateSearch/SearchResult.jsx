import React from 'react';
import styles from './SearchResult.module.css';

const SearchResult = ({ data }) => {
  return (
    <div className={styles.SearchResult}>
      <h3>검색 결과</h3>
      {'data를 json 파싱해서 배열로 만들고 map 돌려서 SearchResultCard를 만듦'}
    </div>
  );
};

export default SearchResult;
