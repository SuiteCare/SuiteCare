import React from 'react';

import { weekdayDic } from '@/utils/calculators';

const ModalReservationTab = ({ modalData, styles }) => {
  return (
    <>
      <div className='input_wrapper'>
        <label>{modalData.family.slice(0, 4)}</label>
        {modalData.family.slice(4)}
      </div>
      <hr />
      <div className='input_wrapper'>
        <label>간병지 주소</label>
        <div>
          <span className={`${modalData.detail.reservation.location === 'hospital' ? styles.hospital : styles.home}`}>
            {modalData.detail.reservation.location}
          </span>{' '}
          {modalData.detail.reservation.road_address} {modalData.detail.reservation.address_detail}
        </div>
      </div>
      <div className='input_wrapper'>
        <label>간병 기간</label>
        {modalData.detail.reservation.start_date} ~ {modalData.detail.reservation.end_date}
      </div>
      <div className='input_wrapper'>
        <label>간병 요일</label>
        {modalData.detail.reservation.weekdays.map((e) => weekdayDic[e]).join(', ')}
      </div>
      <div className='input_wrapper'>
        <label>시급</label>
        {modalData.detail.reservation.wage.toLocaleString()}원
      </div>
    </>
  );
};

export default ModalReservationTab;
