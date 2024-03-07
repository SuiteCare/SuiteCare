import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MateManageSidebar from '@/components/Mate/MateManage/MateManageSidebar';
import MateOffer from '@/components/Mate/MateManage/MateOffer/MateOffer';

const MateOfferPage = () => {
  return (
    <>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateManageSidebar activeMenu='offer' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>간병 요청 목록</h1>
            <span>패밀리가 나에게 간병을 요청한 공고 목록을 확인할 수 있습니다.</span>
          </div>
          <MateOffer />
        </div>
      </div>
    </>
  );
};

export default MateOfferPage;
