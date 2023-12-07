const MainCard = ({ title, onClick }) => {
  return (
    <div className='MainCard' onClick={onClick}>
      {title}
    </div>
  );
};

export default MainCard;
