import MateHeader from '@/components/Mate/MateHeader/MateHeader';
import SignUpForm from '@/components/Common/SignUp/SignUpForm';

const SignUp = () => {
  return (
    <div className='SignUp'>
      <MateHeader />
      <div className='title_wrapper'>
        <h1>메이트 회원가입</h1>
        <span>간병 일감을 찾을 수 있는 메이트 회원가입 페이지입니다.</span>
      </div>
      <SignUpForm type='mate' />
    </div>
  );
};

export default SignUp;
