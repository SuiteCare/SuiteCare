import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';
import useAlert from '@/hooks/useAlert';

import styles from './AppliedRecruitmentCard.module.css';

import { calAge, calTimeDiff, countWeekdays, genderToKo, weekdayDic } from '@/utils/calculators.js';

const AppliedRecruitmentCard = ({ data, showDetail }) => {
  const { openAlert, alertComponent } = useAlert();
  const router = useRouter();

  const dueDate = Math.ceil((new Date(data.expire_at) - new Date()) / (1000 * 3600 * 24));
  const dataDayArr = data.day.split(',');
  const [startTime, endTime] = [data.start_time.slice(0, 5), data.end_time.slice(0, 5)];

  const expiredAlert = () => {
    alert('만료된 간병입니다.');
  };

  const statusDict = {
    P: '수락 대기중',
    R: '지원 탈락',
  };

  const handleDelete = async ($recruitmentId) => {
    const response = await axiosInstance.delete(`/api/v1/applicant/${$recruitmentId}`);
    if (response.data) {
      openAlert('공고 지원이 취소되었습니다.');
      router.reload();
    } else {
      openAlert('공고 지원 취소에 실패하였습니다.');
    }
  };

  return (
    <div className={`${styles.card} ${dueDate <= 0 ? styles.expired : ''}`}>
      {alertComponent}
      <div className={styles.top}>
        <span className={styles[data.status === 'P' ? 'pending' : 'reject']}>{statusDict[data.status]}</span>
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
        <span className={data.location === '병원' ? styles.hospital : styles.home}>{data.location}</span>
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
        <button type='submit' onClick={dueDate <= 0 ? expiredAlert : () => handleDelete(data.recruitment_id)}>
          지원 취소하기
        </button>
      </div>

      {/* bottom */}
    </div>
  );
};

export default AppliedRecruitmentCard;
