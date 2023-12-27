import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyCalendar from '@/components/Family/FamilyManage/FamilyCalendar';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';

const FamilyCalendarPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>내 일정 정보</h1>
            <span>나의 간병 예약 일정을 확인할 수 있습니다.</span>
          </div>
          <FamilyCalendar />
        </div>
      </div>
    </>
  );
};

export default FamilyCalendarPage;
