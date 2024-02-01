import styles from '../FamilyManageTable.module.css';

const HistoryTable = ({ data }) => {
  return (
    <table className={styles.FamilyManageTable}>
      <thead>
        <tr>
          <th>예약 상태</th>
          <th>예약 신청일</th>
          <th>예약 체결일</th>
          <th>결제 완료일</th>
          <th>간병인 성명</th>
          <th>환자 성명</th>
          <th>진단명</th>
          <th>간병 시작일</th>
          <th>간병 종료일</th>
          <th>예약 상세정보</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e}>
            <td>{e.status}</td>
            <td>{e.create_at}</td>
            <td>{e.update_at || '예약 미체결'}</td>
            <td>{e.payment_at || '결제 미처리'}</td>
            <td>{e.mate_name || '간병인 미배정'}</td>
            <td>{e.patient_name}</td>
            <td>{e.diagnosis}</td>
            <td>{e.start_date}</td>
            <td>{e.end_date}</td>
            <td>
              <button type='button'>상세정보 보기</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
