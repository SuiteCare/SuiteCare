import { useQuery } from 'react-query';
import { useState } from 'react';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import PendingPaymentCard from './PendingPaymentCard';
import Loading from '@/components/Common/Modal/Loading';

const FamilyPaymentList = () => {
  const { id } = useLoginInfo();
  const [data, setData] = useState();

  const {
    data: reservationData,
    isError: isReservationDataError,
    isLoading: isReservationDataLoading,
  } = useQuery(
    ['reservationData', id],
    async () => {
      const { data } = await axiosInstance.get('/api/v1/reservation/family');
      const { code, result } = data;
      if (code === 200) {
        const filteredResult = result.filter((e) => !e.pay_at && new Date(e.start_date) >= new Date());
        filteredResult.forEach((e) => {
          setData((prevData) => ({
            ...prevData,
            [e.recruitment_id]: e,
          }));
        });

        return filteredResult;
      }
      console.log('데이터를 가져오는 데 오류가 발생했습니다.');
      return [];
    },
    {
      enabled: Boolean(id),
    },
  );

  return (
    <>
      {isReservationDataLoading && <Loading />}
      {reservationData?.length > 0 ? (
        <div className='FamilyPaymentList'>
          {data &&
            Object.values(data).map((e) => {
              return <PendingPaymentCard key={e.id} data={e} />;
            })}
        </div>
      ) : (
        <div className='no_result'>결제를 기다리는 간병이 없습니다.</div>
      )}
    </>
  );
};

export default FamilyPaymentList;
