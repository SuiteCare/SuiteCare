import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateHistory from '@/components/Mate/MateManage/History/MateHistory';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateHistoryPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar activeMenu='history' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>간병 수행 내역</h1>
            <span>내가 현재까지 수행한 간병 내역을 확인할 수 있습니다.</span>
          </div>
          <MateHistory />
        </div>
      </div>
    </>
  );
};

export default MateHistoryPage;
