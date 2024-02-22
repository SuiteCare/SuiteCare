import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';
import PendingReservation from '@/components/Family/FamilyManage/Reservation/PendingReservaton';

const FamilyManageReservationPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar activeMenu='reservation' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>간병예약 확정하기</h1>
            <span>나의 간병 공고에 지원한 간병인들의 목록 중 원하는 메이트를 선택할 수 있습니다.</span>
          </div>
          <PendingReservation />
        </div>
      </div>
    </>
  );
};

export default FamilyManageReservationPage;
