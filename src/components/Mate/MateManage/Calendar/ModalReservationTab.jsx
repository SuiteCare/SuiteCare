import React from 'react';

import { weekdayDic } from '@/utils/calculators';

const ModalReservationTab = ({ modalData }) => {
  return (
    <>
      <div className='input_wrapper'>
        <label>보호자</label>
        {modalData.family.slice(4)}
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
