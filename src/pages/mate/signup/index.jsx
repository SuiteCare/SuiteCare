import Header from '@/components/Mate/MateHeader/MateHeader';
import SignUpForm from '@/components/Common/SignUp/SignUpForm';

const SignUp = () => {
  return (
    <div className='SignUp'>
      <Header />
      <SignUpForm type='mate' />
    </div>
  );
};

export default SignUp;
