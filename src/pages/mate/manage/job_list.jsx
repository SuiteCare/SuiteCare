import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateJobListPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>공고 지원 목록</h1>
            <span>내가 지원한 간병 공고 및 나에게 들어온 간병 신청 내역을 확인할 수 있습니다.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MateJobListPage;
