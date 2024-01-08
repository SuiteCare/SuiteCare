import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateCalendar from '@/components/Mate/MateManage/MateCalendar';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateCalendarPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>내 일정 정보</h1>
            <span>내가 진행할 간병 일정 정보를 확인할 수 있습니다.</span>
          </div>
          <MateCalendar />
        </div>
      </div>
    </>
  );
};

export default MateCalendarPage;
