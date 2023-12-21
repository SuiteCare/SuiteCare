import styles from './SearchResultCard.module.css';
import { calAge, calTimeDiff, countWeekdays } from '@/utils/calculators.js';

const SearchResultCard = ({ data, showDetail, handleApply }) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={data.location_type === '병원' ? styles.hospital : styles.home}>{data.location_type}</span>
        <span className={styles.dday}>
          지원 마감 <b>D-{Math.ceil((new Date(data.start_date) - new Date()) / (1000 * 3600 * 24))}</b>
        </span>
      </div>
      {/* title */}
      <div className={styles.userInfo_wrapper}>
        <div className={styles.title}>
          <label>{data.address}</label>
        </div>
        {/* title */}
        {/* body */}
        <div className={styles.userInfo}>
          <label>진단명</label>
          <span>{data.diagnosis_name}</span>
        </div>
        <div className={styles.userInfo}>
          <label>나이/성별</label>
          <span>
            만 {calAge(data.patient_birthday)}세 {data.gender === 'F' ? '여성' : '남성'}
          </span>
        </div>
        <div className={styles.userInfo}>
          <label>간병 기간</label>
          <span>
            {data.start_date} ~ {data.end_date}{' '}
            <span>(총 {countWeekdays(data.start_date, data.end_date, data.week_days)}일)</span>
          </span>
        </div>
        <div className={styles.userInfo}>
          <label>간병 요일</label>
          {data.week_days.join(', ')}
        </div>
        <div className={styles.userInfo}>
          <label>출퇴근시간</label>
          <span>
            {data.start_time} ~ {data.end_time}{' '}
            <span>
              (총 {calTimeDiff(data.start_time, data.end_time)}
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
              calTimeDiff(data.start_time, data.end_time) *
              countWeekdays(data.start_date, data.end_date, data.week_days)
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      {/* body */}
      {/* bottom */}
      <div className={styles.search_button_wrapper}>
        <button onClick={() => showDetail(data.mate_id)}>상세정보 보기</button>
        <button onClick={() => handleApply(data.mate_id)}>간병 지원하기</button>
      </div>
      {/* bottom */}
    </div>
  );
};

export default SearchResultCard;
