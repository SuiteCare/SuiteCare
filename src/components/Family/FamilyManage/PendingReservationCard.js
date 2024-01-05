import { useEffect, useState } from 'react';

import styles from './PendingReservationCard.module.css';

import { calAge, genderToKo, countWeekdays, calTimeDiff, weekdayDic } from '@/utils/calculators';

const PendingReservationCard = () => {
  // id로 해당멤버의 예약정보 중 간병인 null이고 start_date가 오늘 이후인 거 가져옴
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem('login_info'))?.login_id);
  }, []);

  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  const oneweekafter = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(
    new Date().getDate() + 7
  )
    .toString()
    .padStart(2, '0')}`;

  const dummydata = [
    {
      patient: {
        patient_id: id,
        name: '김환자',
        birthday: '1965-01-01',
        gender: 'M',
        height: '163',
        weight: '60',
        diagnosis_name: '진단명예시',
      },
      reservation: {
        location: '병원',
        address: '기본주소 예시',
        address_detail: '상세주소 예시',
        start_date: today,
        end_date: oneweekafter,
        weekday: [0, 2, 6],
        start_time: '09:00',
        end_time: '18:00',
        wage: '15000',
      },
    },
    {
      patient: {
        patient_id: id,
        name: '김환자',
        birthday: '1965-01-01',
        gender: 'M',
        height: '163',
        weight: '60',
        diagnosis_name: '진단명예시',
      },
      reservation: {
        location: '자택',
        address: '기본주소 예시',
        address_detail: '상세주소 예시',
        start_date: today,
        end_date: oneweekafter,
        weekday: [1, 3, 4],
        start_time: '09:00',
        end_time: '18:00',
        wage: '15000',
      },
    },
  ];

  return (
    <div>
      {dummydata.map((data, index) => (
        <div key={index} className={`${styles.card}`}>
          <div className={styles.top}>
            <span className={data.reservation.location === '병원' ? styles.hospital : styles.home}>
              {data.reservation.location}
            </span>
            <span>
              {data.reservation.address} {data.reservation.address_detail}
            </span>
          </div>

          <div>
            {/* title */}
            <div className={styles.userInfo_wrapper}>
              <div className={styles.title}>
                <label>{data.patient.name}</label>
              </div>
              {/* title */}
              {/* body */}
              <div className={styles.userInfo}>
                <label>진단명</label>
                <span>{data.patient.diagnosis_name}</span>
              </div>
              <div className={styles.userInfo}>
                <label>나이/성별</label>
                <span>
                  만 {calAge(data.patient_birthday)}세 {genderToKo(data.gender)}성
                </span>
              </div>
              <div className={styles.userInfo}>
                <label>간병 기간</label>
                <span>
                  {data.reservation.start_date} ~ {data.reservation.end_date}{' '}
                  <span>
                    (총{' '}
                    {countWeekdays(data.reservation.start_date, data.reservation.end_date, data.reservation.weekday)}
                    일)
                  </span>
                </span>
              </div>
              <div className={styles.userInfo}>
                <label>간병 요일</label>
                {data.reservation.weekday.map((e) => weekdayDic[e]).join(', ')}
              </div>
              <div className={styles.userInfo}>
                <label>출퇴근시간</label>
                <span>
                  {data.reservation.start_time} ~ {data.reservation.end_time}{' '}
                  <span>
                    (총 {calTimeDiff(data.reservation.start_time, data.reservation.end_time)}
                    시간)
                  </span>
                </span>
              </div>
              <div className={styles.userInfo}>
                <label>제시 시급</label>
                <span>{(+data.reservation.wage).toLocaleString()}원</span>
              </div>
              <div className={styles.userInfo}>
                <label> 예상 총 급여</label>
                <span>
                  {(
                    data.reservation.wage *
                    calTimeDiff(data.reservation.start_time, data.reservation.end_time) *
                    countWeekdays(data.reservation.start_date, data.reservation.end_date, data.reservation.weekday)
                  ).toLocaleString()}
                  원
                </span>
              </div>
            </div>
            {/* body */}
            {/* bottom */}
            <div className={styles.search_button_wrapper}>
              <button onClick={() => alert('지원한 간병인 목록 띄워야 됨')}>환자 상세정보</button>
              <button onClick={() => alert('지원한 간병인 목록 띄워야 됨')}>지원한 간병인 목록</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingReservationCard;
