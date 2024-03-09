import Header from '@/components/Mate/MateHeader/MateHeader';
import MenuList from '@/components/Mate/MateHeader/MateMenuList';
import MainCard from '@/components/Common/Main/MainCard';

import styles from '@/pages/main.module.css';

const Main = () => {
  const cards = MenuList.map((e) => <MainCard key={e.title} menu={e} />);

  return (
    <>
      <Header />
      <div className='title_wrapper'>
        <h1>간병 일감 찾기</h1>
        <span>스위트케어 메이트를 위한 메인 페이지입니다.</span>
      </div>
      <div className={`${styles.Main} ${styles.Mate}`}>{cards}</div>
    </>
  );
};

export default Main;
