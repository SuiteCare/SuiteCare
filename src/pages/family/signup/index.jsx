import FamilyHeader from '@/components/Family/FamilyHeader/FamilyHeader';
import SignUpForm from '@/components/Common/SignUp/SignUpForm';

const SignUp = () => {
  return (
    <div className='SignUp'>
      <FamilyHeader isCheckLogin={false} />
      <div className='title_wrapper'>
        <h1>패밀리 회원가입</h1>
        <span>간병 서비스를 신청할 수 있는 패밀리 회원가입 페이지입니다.</span>
      </div>
      <SignUpForm type='family' />
    </div>
  );
};

export default SignUp;
