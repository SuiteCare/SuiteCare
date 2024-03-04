import React from 'react';

import { calTimeDiff, countWeekdays, normalizeWeekDays, weekdayDic } from '@/utils/calculators';

const ReservationData = ({ styles, reservationData }) => {
  return (
    <div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>예약일</label>
        <span>{reservationData.create_at}</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>예약 상태</label>
        <span>{reservationData.status === 'P' ? '예약 미체결' : '다른거'}</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>담당 간병인</label>
        <span>{reservationData.mate_id ? '간병인이름불러와야됨' : '간병인 미배정'}</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>결제 여부</label>
        <span>{reservationData.payment_at || '결제 미처리'}</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병지 주소</label>
        <div>
          <span className={`${styles.location} ${reservationData.location === '자택' ? styles.home : styles.hospital}`}>
            {reservationData.location}
          </span>
          <span>
            {reservationData.road_address} {reservationData.address_detail}
          </span>
        </div>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병 기간</label>
        <span>
          {reservationData.start_date} ~ {reservationData.end_date}{' '}
          <span>
            (총 {countWeekdays(reservationData.start_date, reservationData.end_date, reservationData.weekday)}
            일)
          </span>
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병 요일</label>
        <span>
          {reservationData.weekday
            .split(',')
            .map((e) => weekdayDic[e])
            .join(', ')}
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>출퇴근시간</label>
        <span>
          {reservationData.start_time} ~ {reservationData.end_time}{' '}
          <span>(총 {calTimeDiff(reservationData.start_time, reservationData.end_time)}시간)</span>
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>제시 시급</label>
        <span>{reservationData.wage.toLocaleString()}원</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>예상 총 급여</label>
        <span>
          {(
            reservationData.wage *
            calTimeDiff(reservationData.start_time, reservationData.end_time) *
            countWeekdays(reservationData.start_date, reservationData.end_date, reservationData.weekday)
          ).toLocaleString()}
          원
        </span>
      </div>
      <div className='button_wrapper' />
    </div>
  );
};

export default ReservationData;
