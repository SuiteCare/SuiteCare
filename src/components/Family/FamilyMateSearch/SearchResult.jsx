import React, { useState, useEffect } from 'react';
import styles from './SearchResult.module.css';
import SearchResultCard from './SearchResultCard';
import MateDetailModal from './MateDetailModal';

const SearchResult = ({ data, type }) => {
  const [modalData, setModalData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (typeof document !== 'undefined') {
        if (isModalVisible) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }
    };

    handleBodyOverflow();

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isModalVisible]);

  const handleShowModal = async (defaultData) => {
    // const combinedData = { ...defaultData, ...(await getModalData(defaultData.mate_id)) };
    const combinedData = {
      ...defaultData,
      ...{
        contact_time_start: '09:00',
        contact_time_end: '22:00',
        career: [
          {
            title: '경력 01',
            date_start: '2020-01-01',
            date_end: '2022-12-31',
          },
          {
            title: '경력 02',
            date_start: '2023-07-01',
            date_end: '2023-12-14',
          },
        ],
        certificate: [
          {
            certificate_name: '자격증 01',
            qualification_date: '2019-02-22',
            expired_date: '2029-02-22',
          },
          {
            certificate_name: '자격증 02',
            qualification_date: '2016-04-02',
            expired_date: '2021-04-02',
          },
        ],
      },
    };
    setModalData(combinedData);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  async function getModalData($mate_id) {
    try {
      const response = await axios.get('/api/v1/familymatesearch', { params: $mate_id });
      const msg = response.headers.get('msg');
      if (response.status === 200 && msg === 'success') {
        alert(response.data);
        console.log(response.data);
        return response.data;
      } else if (msg === 'fail') {
        alert('데이터 불러오기 실패');
        return {};
      }
    } catch (error) {
      console.error('Error occurred while fetching modal data:', error);
      return {};
    }
  }

  return (
    <div className={`${styles.SearchResult} Form_wide`}>
      <h3>
        {type === 'search'
          ? `${data.length ? data.length : 0}명의 메이트님을 찾았습니다. 지금 간병을 신청해 보세요!`
          : `스위트케어가 추천하는 메이트`}
      </h3>
      {data && data.length > 0 ? (
        data.map((e) => <SearchResultCard data={e} key={e.id} showDetail={() => handleShowModal(e)} />)
      ) : (
        <div className={styles.no_result}>검색 결과가 없습니다.</div>
      )}
      {isModalVisible && <MateDetailModal modalData={modalData} closeModal={closeModal} />}
    </div>
  );
};

export default SearchResult;
