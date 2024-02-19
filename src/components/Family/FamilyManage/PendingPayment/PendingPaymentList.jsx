import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';

import PendingPaymentCard from './PendingPaymentCard';
import Loading from '@/components/Common/Modal/Loading';
import useModal from '@/hooks/useModal';
import ReservationDetailModal from '../History/ReservationDetailModal';
import { useState } from 'react';

const FamilyPaymentList = () => {
  const { id } = useLoginInfo();
  const { isModalVisible, openModal, closeModal } = useModal();

  const { data, isError, isLoading } = useQuery(
    ['reservationList', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/reservation', { params: { id } });
      return response.data.filter((e) => e.mate_id && !e.payment_at).reverse();
    },
    {
      enabled: Boolean(id),
    },
  );

  const [selectedReservation, setSelectedReservation] = useState({});

  const handleReservationDetailButton = (e) => {
    setSelectedReservation(data?.find((v) => v.id === e.target.id));
  };
  const handlePaymentButton = (e) => {
    console.log(e.id);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className='FamilyPaymentList'>
        {data?.map((e) => {
          return (
            <PendingPaymentCard
              key={e.id}
              id={id}
              data={e}
              handleReservationDetailButton={handleReservationDetailButton}
              handlePaymentButton={handlePaymentButton}
            />
          );
        })}
      </div>
      {isModalVisible && <ReservationDetailModal selectedReservation={selectedReservation} closeModal={closeModal} />}
    </>
  );
};

export default FamilyPaymentList;
