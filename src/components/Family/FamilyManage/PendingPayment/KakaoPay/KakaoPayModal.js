import React, { useEffect } from 'react';

import useLoginInfo from '@/hooks/useLoginInfo';
import axiosInstance from '@/services/axiosInstance';

import Loading from '@/components/Common/Modal/Loading';

import { calTimeDiff, countWeekdays, normalizeWeekDays } from '@/utils/calculators';

const KakaoPayModal = ({ modalData, closeModal }) => {
  const { wage, start_date, end_date, start_time, end_time, weekday, mate_name, recruitment_id } = modalData;
  const { id } = useLoginInfo();
  const totalAmount =
    wage * calTimeDiff(start_time, end_time) * countWeekdays(start_date, end_date, normalizeWeekDays(weekday));

  const openWindowPopup = (url, name) => {
    const options = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open(url, name, options);
  };

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
        approval_url: `${window.location.origin}/family/payment/kakaopay/success`,
        cancel_url: `${window.location.origin}/family/payment/kakaopay/cancel`,
        fail_url: `${window.location.origin}/family/payment/kakaopay/fail`,
      };

      console.log(body);

      const response = await axiosInstance.post('/api/v1/payment/kakaopay', body);
      if (response.data) {
        openWindowPopup(response.data.next_redirect_pc_url, 'popup');
        closeModal();
      } else {
        alert('결제에 실패하였습니다.');
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    id && totalAmount && requestKakaopay();
  }, [id, totalAmount]);

  return <Loading />;
};

export default KakaoPayModal;
