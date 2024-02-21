import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateJobListPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar activeMenu='request' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>나에게 들어온 신청</h1>
            <span>나에게 직접 요청된 간병 신청의 목록을 확인할 수 있습니다.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MateJobListPage;
