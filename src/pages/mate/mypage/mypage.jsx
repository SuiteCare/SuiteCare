import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import MyPageForm from '@/components/Common/MyPage/MyPageForm';
import MateMyPageSidebar from '@/components/Mate/MateMyPage/MateMyPageSidebar';

const MyPage = () => {
  return (
    <div className='MyPage'>
      <MateHeader />
      <div className='page_with_sidebar'>
        <MateMyPageSidebar activeMenu='userinfo' />
        <div className='content_wrapper'>
          <div className='title_wrapper'>
            <h1>마이페이지</h1>
          </div>
          <MyPageForm />
        </div>{' '}
      </div>
    </div>
  );
};

export default MyPage;
