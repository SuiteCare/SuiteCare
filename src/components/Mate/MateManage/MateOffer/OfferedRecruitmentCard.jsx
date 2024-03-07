import styles from './OfferedRecruitmentCard.module.css';

import { calAge, calTimeDiff, countWeekdays, genderToKo, weekdayDic } from '@/utils/calculators.js';

const OfferedRecruitmentCard = ({ data, showDetail, handleApply }) => {
  const dueDate = Math.ceil((new Date(data.expire_at) - new Date()) / (1000 * 3600 * 24));

  const dataDayArr = data.day.split(',');

  const [startTime, endTime] = [data.start_time.slice(0, 5), data.end_time.slice(0, 5)];

  const expiredAlert = () => {
    alert('만료된 간병입니다.');
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
      <div className={styles.search_button_wrapper}>
        <button type='button' onClick={dueDate <= 0 ? expiredAlert : () => showDetail(data.mate_id)}>
          상세정보 보기
        </button>
        {data.status === 'P' ? (
          <button type='submit' onClick={dueDate <= 0 ? expiredAlert : () => handleApply(data.id)}>
            요청 수락하기
          </button>
        ) : (
          <button>요청 취소됨</button>
        )}
        <button type='submit' onClick={dueDate <= 0 ? expiredAlert : () => handleApply(data.id)}>
          요청 거절하기
        </button>
      </div>

      {/* bottom */}
    </div>
  );
};

export default OfferedRecruitmentCard;
