import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';
import PendingReservationCard from '@/components/Family/FamilyManage/PendingReservationCard';

const FamilyManageReservationPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar activeMenu='reservation' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>간병예약 확정하기</h1>
            <span>나의 간병 예약 신청에 지원한 간병인들의 목록을 확인하고 선택하세요.</span>
          </div>
          <PendingReservationCard />
        </div>
      </div>
    </>
  );
};

export default FamilyManageReservationPage;
