import React, { useState } from 'react';

import useModal from '@/hooks/useModal';
import useLoginInfo from '@/hooks/useLoginInfo';
import usePatientList from '@/services/apis/usePatientList';

import ReservationDetailModal from './ReservationDetailModal';
import styles from '../FamilyManageTable.module.css';

const HistoryTable = ({ data }) => {
  const { id } = useLoginInfo();
  const { isModalVisible, openModal, closeModal } = useModal();
  const { isError, isLoading, patientList } = usePatientList(id);

  const selectPatient = ($id) => patientList?.find((e) => e.id === $id);

  const [reservationId, setReservationId] = useState(-1);

  const handleDetailClick = ($event) => {
    setReservationId($event.id);
    openModal();
  };

  return (
    <>
      {data?.length > 0 ? (
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
            {data?.map((e) => {
              const patient = selectPatient(e.patient_id);
              return (
                <tr key={e.id}>
                  <td>
                    {e.status === 'P' ? '대기중' : e.status === 'C' ? '진행중' : e.status === 'F' ? '종료' : '오류'}
                  </td>
                  <td>{e.create_at}</td>
                  <td>{e.update_at || '예약 미체결'}</td>
                  <td>{e.payment_at || '결제 미처리'}</td>
                  <td>{e.mate_name || '간병인 미배정'}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.diagnosis_name}</td>
                  <td>{e.start_date}</td>
                  <td>{e.end_date}</td>
                  <td>
                    <button type='button' onClick={() => handleDetailClick(e)}>
                      상세정보 보기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className='error'>간병 예약 내역이 없습니다.</div>
      )}

      {isModalVisible && (
        <ReservationDetailModal
          selectedReservation={data.find((e) => e.id === reservationId)}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default HistoryTable;
