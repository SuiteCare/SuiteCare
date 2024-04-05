import React from 'react';

import styles from '@/components/Common/ManageTable.module.css';

const HistoryTable = ({ data, handleDetailClick, tabType }) => {
  const renderDateHeader = () => {
    const dateHeader = {
      apply: '공고 지원일',
      offer: '제안 수신일',
    };
    return dateHeader[tabType] ? <th>{dateHeader[tabType]}</th> : null;
  };

  const renderStatus = ($status) => {
    const statusKorean = {
      P: '매칭 대기',
      C: '예약 확정',
      E: '기한 만료',
      R: '매칭 거절',
    };

    return statusKorean[$status];
  };

  return data?.length > 0 ? (
    <table className={styles.ManageTable}>
      <thead>
        <tr>
          <th>ID</th>
          {renderDateHeader()}
          {tabType === 'reservation' && <th>예약 확정일</th>}
          {tabType === 'reservation' && <th>결제 완료일</th>}
          {(tabType === 'apply' || tabType === 'offer') && <th>내역 상태</th>}
          <th>간병 시작일</th>
          <th>간병 종료일</th>
          <th>간병 상세정보</th>
        </tr>
      </thead>

      <tbody>
        {data?.filter(
          (e) =>
            (tabType === 'apply' && e.request_by === 'M') ||
            (tabType === 'offer' && e.request_by === 'F') ||
            (tabType !== 'apply' && tabType !== 'offer'),
          )
          .map((e) => (
            <tr key={e.recruitment_id}>
              <td>{e.id || e.recruitment_id}</td>
              {e.create_at && <td>{e.create_at.slice(0, 10)}</td>}
              {tabType === 'reservation' && <td>{e.confirm_at}</td>}
              {tabType === 'reservation' && <td>{e.pay_at || '결제 대기'}</td>}
              {(tabType === 'apply' || tabType === 'offer') && <td>{renderStatus(e.status)}</td>}
              <td>{e.start_date}</td>
              <td>{e.end_date}</td>
              <td>
                <button type='button' onClick={() => handleDetailClick(e.recruitment_id)}>
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
