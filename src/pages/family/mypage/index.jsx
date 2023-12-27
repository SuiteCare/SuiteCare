import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import MyPageForm from '@/components/Common/MyPage/MyPageForm';

const MyPage = () => {
  return (
    <div className='MyPage'>
      <FamilyHeader />
      <div className='title_wrapper'>
        <h1>마이페이지</h1>
      </div>
      <MyPageForm />
    </div>
  );
};

export default MyPage;
