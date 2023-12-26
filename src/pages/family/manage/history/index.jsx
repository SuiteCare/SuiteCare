import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import FamilyManageSidebar from '@/components/Family/FamilyManage/FamilyManageSidebar';
import FamilyHistory from '@/components/Family/FamilyManage/FamilyHistory';

const FamilyHistoryPage = () => {
  return (
    <>
      <FamilyHeader />
      <div className='page_with_sidebar'>
        <FamilyManageSidebar />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>간병 신청 내역</h1>
            <span>내가 현재까지 신청한 간병 서비스 내역을 확인할 수 있습니다.</span>
          </div>
          <FamilyHistory />
        </div>
      </div>
    </>
  );
};

export default FamilyHistoryPage;
