import { useQuery } from 'react-query';
import { useState } from 'react';

import axiosInstance from '@/services/axiosInstance';
import useLoginInfo from '@/hooks/useLoginInfo';
import useModal from '@/hooks/useModal';

import PendingPaymentCard from './PendingPaymentCard';
import Loading from '@/components/Common/Modal/Loading';
import ReservationDetailModal from '../History/ReservationDetailModal';
import KakaoPayModal from './KakaoPay/KakaoPayModal';

const FamilyPaymentList = () => {
  const { id } = useLoginInfo();
  const { isModalVisible: isDetailModalVisible, openModal: openDetailModal, closeModal: closeDetailModal } = useModal();
  const [data, setData] = useState();

  const {
    data: reservationData,
    isError: isReservationDataError,
    isLoading: isReservationDataLoading,
  } = useQuery(
    ['reservationData', id],
    async () => {
      const response = await axiosInstance.get('/api/v1/reservation/family');
      // payment_at이 null이고 이미 간병이 시작된 (시작일이 오늘 이전인) 데이터만 필터링할 예정
      // const filteredData = response.data.filter((e) => e.payment_at === null && new Date(e.start_date) >= new Date());
      response.data.forEach((e) => {
        setData((prevData) => ({
          ...prevData,
          [e.recruitment_id]: e,
        }));
      });

      return response.data;
    },
    {
      enabled: Boolean(id),
    },
  );

  const [selectedReservation, setSelectedReservation] = useState({});

  const handleReservationDetailButton = ($detailData) => {
    setSelectedReservation({ ...data, ...$detailData });
    openDetailModal();
  };

  return (
    <>
      {isReservationDataLoading && <Loading />}
      {reservationData?.length > 0 ? (
        <div className='FamilyPaymentList'>
          {data &&
            Object.values(data).map((e) => {
              return (
                <PendingPaymentCard key={e.id} data={e} handleReservationDetailButton={handleReservationDetailButton} />
              );
            })}
        </div>
      ) : (
        <div className='no_result'>결제를 기다리는 간병이 없습니다.</div>
      )}
      {isDetailModalVisible && (
        <ReservationDetailModal selectedReservation={selectedReservation} closeModal={closeDetailModal} />
      )}
    </>
  );
};

export default FamilyPaymentList;
