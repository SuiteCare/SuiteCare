import React from 'react';

import styles from '@/components/Common/ManageTable.module.css';

const HistoryTable = ({ data, handleDetailClick, tabType }) => {
  const statusKorean = {
    P: '매칭 대기',
    C: '예약 확정',
    E: '기한 만료',
  };

  const renderStatus = ($status) => statusKorean[$status] || 'No data';

  const renderReservationStatus = ($startDate, $endDate) => {
    const today = new Date();
    if (new Date($startDate) > today) return '진행 대기';
    if (new Date($endDate) < today) return '종료';
    return '진행 중';
  };

  const formatDate = (date) => (date ? date.slice(0, 10) : 'No data');

  const renderTableHeader = () => {
    if (tabType === 'recruitment') {
      return (
        <>
          <th>공고 등록일</th>
          <th>공고 마감일</th>
          <th>내역 상태</th>
          <th>환자명</th>
          <th>진단명</th>
        </>
      );
    }
    if (tabType === 'reservation') {
      return (
        <>
          <th>예약 확정일</th>
          <th>결제 완료일</th>
          <th>내역 상태</th>
          <th>담당 메이트</th>
        </>
      );
    }
  };

  const renderTableColumns = (e) => {
    if (tabType === 'recruitment') {
      return (
        <>
          <td>{formatDate(e.create_at)}</td>
          <td>{formatDate(e.expire_at)}</td>
          <td>{renderStatus(e.status)}</td>
          <td>{e.patient_name}</td>
          <td>{e.patient_diagnosis_name}</td>
        </>
      );
    }
    if (tabType === 'reservation') {
      return (
        <>
          <td>{formatDate(e.confirm_at)}</td>
          <td>{e.pay_at || '결제 대기'}</td>
          <td>{renderReservationStatus(e.start_date, e.end_date)}</td>
          <td>{`${e.mate_name} (${e.mate_resume_id})`}</td>
        </>
      );
    }
  };

  return data?.length > 0 ? (
    <table className={styles.ManageTable}>
      <thead>
        <tr>
          <th>ID</th>
          {renderTableHeader()}
          <th>간병 시작일</th>
          <th>간병 종료일</th>
          <th>간병 상세정보</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((e) => (
          <tr key={e.id}>
            <td>{e.id || e.recruitment_id}</td>
            {renderTableColumns(e)}
            <td>{e.start_date}</td>
            <td>{e.end_date}</td>
            <td>
              <button type='button' onClick={() => handleDetailClick(e.id)}>
                상세정보 보기
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className='error'>간병 예약 내역이 없습니다.</div>
  );
};

export default HistoryTable;
