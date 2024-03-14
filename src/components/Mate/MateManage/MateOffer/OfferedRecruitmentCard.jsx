import { useMutation } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './OfferedRecruitmentCard.module.css';

import { calAge, calTimeDiff, countWeekdays, genderToKo, weekdayDic } from '@/utils/calculators.js';

const OfferedRecruitmentCard = ({ data, showDetail }) => {
  const { id } = useLoginInfo();

  const dueDate = Math.ceil((new Date(data.expire_at) - new Date()) / (1000 * 3600 * 24));

  const dataDayArr = data.day.split(',');

  const [startTime, endTime] = [data.start_time.slice(0, 5), data.end_time.slice(0, 5)];

  const expiredAlert = () => {
    alert('만료된 간병입니다.');
  };

  const mutationForConfirm = useMutation(async (body) => {
    return axiosInstance.post('/api/v1/reservation', body);
  });

  const mutationForReject = useMutation(async (body) => {
    return axiosInstance.patch('/api/v1/reject', body);
  });

  const handleConfirm = async (recruitment_id) => {
    const body = { recruitment_id, mate_id: id, request_by: 'F' };
    console.log('confirm', body);

    try {
      const response = await mutationForConfirm.mutateAsync(body);
      if (response.data) {
        alert('간병예약 컨펌 완료');
      }
    } catch (error) {
      console.error(error);
      alert('요청을 처리하는 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (recruitment_id) => {
    const body = { recruitment_id, mate_id: id, request_by: 'F' };
    console.log('reject', body);

    try {
      const response = await mutationForReject.mutateAsync(body);
      if (response.data) {
        alert('간병 오퍼 거절 완료');
      }
    } catch (error) {
      console.error(error);
      alert('요청을 처리하는 중 오류가 발생했습니다.');
    }
  };

  const renderButton = ($status) => {
    const buttons = {
      P: (
        <>
          <button type='button' onClick={dueDate <= 0 ? expiredAlert : () => showDetail()}>
            상세정보 보기
          </button>
          <button
            type='submit'
            className={styles.confirm}
            onClick={dueDate <= 0 ? expiredAlert : () => handleConfirm(data.recruitment_id)}
          >
            요청 수락하기
          </button>
          <button
            type='submit'
            className={styles.reject}
            onClick={dueDate <= 0 ? expiredAlert : () => handleReject(data.recruitment_id)}
          >
            요청 거절하기
          </button>
        </>
      ),
      C: (
        <>
          <button type='button' onClick={dueDate <= 0 ? expiredAlert : () => showDetail()}>
            상세정보 보기
          </button>
          <button className={styles.confirm}>간병 예약 확정됨</button>
        </>
      ),
      R: <button className={styles.reject}>요청 취소됨</button>,
    };

    return buttons[$status];
  };

  return (
    <div className={`${styles.card} ${dueDate <= 0 ? styles.expired : ''}`}>
      <div className={styles.top}>
        <span className={data.location === '병원' ? styles.hospital : styles.home}>{data.location}</span>
        <span className={styles.dday}>
          공고 마감
          {dueDate > 0 ? (
            <>
              까지 <b>D-{dueDate}</b>
            </>
          ) : (
            <>됨</>
          )}
        </span>
      </div>
      {/* title */}
      <div className={styles.title}>
        <label>{data.road_address}</label>
      </div>
      {/* title */}
      {/* body */}
      <div className={styles.userInfo_wrapper}>
        <div className={styles.userInfo}>
          <label>진단명</label>
          <span>{data.patient_diagnosis_name}</span>
        </div>
        <div className={styles.userInfo}>
          <label>환자 정보</label>
          <span>
            만 {calAge(data.patient_birthday)}세 {genderToKo(data.patient_gender)}성
          </span>
        </div>
        <div className={styles.userInfo}>
          <label>간병 기간</label>
          <span>
            {data.start_date} ~ {data.end_date}{' '}
            <span>(총 {countWeekdays(data.start_date, data.end_date, dataDayArr)}일)</span>
          </span>
        </div>
        <div className={styles.userInfo}>
          <label>간병 요일</label>
          {dataDayArr.map((e) => weekdayDic[e]).join(', ')}
        </div>
        <div className={styles.userInfo}>
          <label>출퇴근시간</label>
          <span>
            {startTime} ~ {endTime}{' '}
            <span>
              (총 {calTimeDiff(startTime, endTime)}
              시간)
            </span>
          </span>
        </div>
        <div className={styles.userInfo}>
          <label>제시 시급</label>
          <span>{data.wage.toLocaleString()}원</span>
        </div>
        <div className={styles.userInfo}>
          <label> 예상 총 급여</label>
          <span>
            {(
              data.wage *
              calTimeDiff(startTime, endTime) *
              countWeekdays(data.start_date, data.end_date, dataDayArr)
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      {/* body */}
      {/* bottom */}
      <div className={styles.search_button_wrapper}>{renderButton(data.status)}</div>

      {/* bottom */}
    </div>
  );
};

export default OfferedRecruitmentCard;
