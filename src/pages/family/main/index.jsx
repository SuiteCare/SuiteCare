import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import MenuList from '@/components/Family/FamilyHeader/FamilyMenuList.js';
import MainCard from '@/components/Common/Main/MainCard';

import styles from '@/pages/main.module.css';

const Main = () => {
  const cards = MenuList.map((e) => <MainCard key={e.title} menu={e} type='family' />);

  return (
    <>
      <Header />
      <div className='title_wrapper'>
        <h1>간병인 찾기</h1>
        <span>스위트케어 패밀리를 위한 메인 페이지입니다.</span>
      </div>
      <div className={`${styles.Main} ${styles.Family}`}>{cards}</div>
    </>
  );
};

export default Main;
