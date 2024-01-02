import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';
import FamilyPaymentList from '@/components/Family/FamilyManage/FamilyPaymentList';

const FamilyCalendarPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar activeMenu='pending_payments' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>결제 대기 목록</h1>
            <span>결제 대금 수납을 기다리는 간병 완료 목록입니다.</span>
          </div>
          <FamilyPaymentList />
        </div>
      </div>
    </>
  );
};

export default FamilyCalendarPage;
