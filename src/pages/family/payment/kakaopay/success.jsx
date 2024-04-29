import React, {useEffect} from 'react';
import {useSearchParams} from "next/navigation";
import axiosInstance from "@/services/axiosInstance";

const KakaopaySuccess = () => {
  const params = useSearchParams();

  const pay = async (params) => {
    const body = {
      pg_token: params.get('pg_token'),
      reservation_id: params.get("reservation_id"),
    };

    if(body.pg_token) {
      try {
        return await axiosInstance.post('/api/v1/payment/success', body);
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    pay(params).then(r => {
      if(r.data.code === 200) {
        alert("결제 완료!!")
        window.close();
      }
    }).catch(e => console.error(e));
  }, [params]);


  return <div />;
};

export default KakaopaySuccess;
