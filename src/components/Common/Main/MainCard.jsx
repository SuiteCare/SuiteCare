import Image from 'next/image';

const MainCard = ({ title, onClick, background }) => {
  return (
    <div className='MainCard' onClick={onClick}>
      <Image src={background} />
      {title}
    </div>
  );
};

export default MainCard;
