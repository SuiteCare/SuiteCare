import HeaderCore from '@/components/Common/Header/HeaderCore';

const Header = ({ isCheckLogin }) => {
  return (
    <div className='Header'>
      <HeaderCore type='family' isCheckLogin={isCheckLogin} />
    </div>
  );
};

export default Header;
