import { React, useState } from 'react';

import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import JobDetailModal from './JobDetailModal';
import useModal from '@/components/Common/Modal/useModal';

const SearchResult = ({ data }) => {
  const [modalData, setModalData] = useState({});
  const { isModalVisible, openModal, closeModal } = useModal();

  const handleShowModal = async (defaultData) => {
    // const combinedData = { ...defaultData, ...(await getModalData(defaultData.mate_id)) }; API 완성되면 되돌려야 함
    const combinedData = {
      ...defaultData,
      ...{},
    };
    setModalData(combinedData);
    openModal();
  };

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <h3>검색 결과 ({data.length ? data.length : 0}건)</h3>
      <div className={styles.card_wrapper}>
        {data && data.length > 0 ? (
          data.map((e) => <SearchResultCard data={e} key={e.id} showDetail={() => handleShowModal(e)} />)
        ) : (
          <div className={styles.no_result}>검색 결과가 없습니다.</div>
        )}
      </div>
      {isModalVisible && <JobDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default SearchResult;
