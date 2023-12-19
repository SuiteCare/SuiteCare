import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyCalendar from '@/components/Family/FamilyReservationList/FamilyCalendar';
import FamilyReservationSidebar from '@/components/Family/FamilyReservationList/FamilyReservationSidebar';

const ReservationList = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyReservationSidebar />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>예약 내역 확인</h1>
            <span>나의 간병 예약 내역을 확인할 수 있습니다.</span>
          </div>
          <FamilyCalendar />
        </div>
      </div>
    </>
  );
};

export default ReservationList;
