import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateApply from '@/components/Mate/MateManage/MateApply/MateApply';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';

const MateApplyPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar activeMenu='apply' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>공고 지원 목록</h1>
            <span>내가 지원한 간병 공고에 대한 정보를 확인할 수 있습니다.</span>
          </div>
          <MateApply />
        </div>
      </div>
    </>
  );
};

export default MateApplyPage;
