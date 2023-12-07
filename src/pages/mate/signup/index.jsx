import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import SignUpForm from '@/components/Common/SignUp/SignUpForm';

const SignUp = () => {
  return (
    <div className='SignUp'>
      <Header />
      <SignUpForm type='family' />
    </div>
  );
};

export default SignUp;
