import React from 'react';
import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';

const SearchResult = ({ data, type }) => {
  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <h3>검색 결과 ({data.length ? data.length : 0}건)</h3>
      <div className={styles.card_wrapper}>
        {data && data.length > 0 ? (
          data.map((e) => <SearchResultCard data={e} key={e.id} />)
        ) : (
          <div className={styles.no_result}>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
