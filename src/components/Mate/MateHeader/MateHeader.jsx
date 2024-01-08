import HeaderCore from '@/components/Common/Header/HeaderCore';

const Header = ({ isCheckLogin }) => {
  return (
    <div className='Header'>
      <HeaderCore type='mate' isCheckLogin={isCheckLogin} />
    </div>
  );
};

export default Header;
