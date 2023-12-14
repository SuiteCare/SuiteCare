import React from 'react';
import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';

const SearchResult = ({ data, type }) => {
  return (
    <div className={styles.SearchResult}>
      <h3>
        {type === 'search' ? `검색 결과 (${data.length ? data.length : 0}건)` : `스위트케어가 추천하는 간병 메이트`}
      </h3>
      {data && data.length > 0 ? (
        data.map((e) => <SearchResultCard data={e} key={e.id} />)
      ) : (
        <div className={styles.no_result}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResult;
