import React from 'react';

import { calTimeDiff, countWeekdays, weekdayDic } from '@/utils/calculators';

const ReservationDetail = ({ styles, modalData, handleMateDetailButton }) => {
  return (
    <>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>담당 메이트</label>
        <div className='input_with_button'>
          <span>
            {modalData.mate_resume_id ? `${modalData.mate_name} (${modalData.mate_resume_id})` : '간병인 미배정'}
          </span>
          <button onClick={handleMateDetailButton}>상세정보 보기</button>
        </div>
      </div>

      <hr />
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병지 주소</label>
        <div>
          <span className={`${styles.location} ${modalData.location === '자택' ? styles.home : styles.hospital}`}>
            {modalData.location}
          </span>
          <span>
            {modalData.road_address} {modalData.address_detail}
          </span>
        </div>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병 기간</label>
        <span>
          {modalData.start_date} ~ {modalData.end_date}{' '}
          <span>
            (총 {countWeekdays(modalData.start_date, modalData.end_date, modalData.weekday)}
            일)
          </span>
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>간병 요일</label>
        <span>
          {modalData.weekday
            .split(',')
            .map((e) => weekdayDic[e])
            .join(', ')}
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>출퇴근시간</label>
        <span>
          {modalData.start_time.slice(0, 5)} ~ {modalData.end_time.slice(0, 5)}{' '}
          <span>(총 {calTimeDiff(modalData.start_time, modalData.end_time)}시간)</span>
        </span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>제시 시급</label>
        <span>{modalData.wage.toLocaleString()}원</span>
      </div>
      <div className={`${styles.info_wrapper} ${styles.single}`}>
        <label>예상 총 급여</label>
        <span>
          {(
            modalData.wage *
            calTimeDiff(modalData.start_time, modalData.end_time) *
            countWeekdays(modalData.start_date, modalData.end_date, modalData.weekday)
          ).toLocaleString()}
          원
        </span>
      </div>
      <div className='button_wrapper' />
    </>
  );
};

export default ReservationDetail;
