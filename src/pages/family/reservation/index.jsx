import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import ReservationForm from '@/components/Family/FamilyReservation/ReservationForm';

const ReservationPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='title_wrapper'>
        <h1>간병 예약하기</h1>
        <span>간병 서비스를 받기 위해 새로운 간병 공고를 올릴 수 있습니다.</span>
      </div>
      <ReservationForm />
    </>
  );
};

export default ReservationPage;
