import React, { useEffect } from 'react';

import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

import { calTimeDiff, countWeekdays, normalizeWeekDays } from '@/utils/calculators';

const PaymentPrepare = ({ modalData }) => {
  const { wage, start_date, end_date, start_time, end_time, weekday, mate_name, recruitment_id } = modalData;
  const { id } = useLoginInfo();
  const totalAmount =
    wage * calTimeDiff(start_time, end_time) * countWeekdays(start_date, end_date, normalizeWeekDays(weekday));

  const requestKakaopay = async () => {
    try {
      const body = {
        cid: 'TC0ONETIME',
        partner_order_id: `${recruitment_id}`,
        partner_user_id: id,
        item_name: `스위트케어 간병 결제 (간병 메이트 ${mate_name})`,
        quantity: 1,
        total_amount: totalAmount,
        tax_free_amount: 0,
        approval_url: '',
        cancel_url: '',
        fail_url: '',
      };

      console.log(body);

      const response = await axiosInstance.post('/api/v1/payment', body);
      if (response.data) {
        alert('결제가? 완료?되었습니다.');
      } else {
        alert('결제에? 실패?하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    id && totalAmount && requestKakaopay();
  }, [id, totalAmount]);

  return <div>{totalAmount.toLocaleString()}원</div>;
};

export default PaymentPrepare;
