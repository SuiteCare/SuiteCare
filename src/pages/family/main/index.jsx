import Header from '@/components/Family/FamilyHeader/FamilyHeader';
import MenuList from '@/components/Family/FamilyHeader/FamilyMenuList.js';
import MainCard from '@/components/Common/Main/MainCard';
import styles from '@/pages/main.module.css';
import { useRouter } from 'next/router';

const Main = () => {
  const navigator = useRouter();

  const navigateTo = (url) => {
    navigator.push(`/${url}`);
  };

  const cards = MenuList.map((e, index) => (
    <MainCard key={index} title={e.title} description={e.description} onClick={() => navigateTo(`family/${e.url}`)} />
  ));

  return (
    <>
      <Header />
      <div className={`${styles.Main} ${styles.Family}`}>{cards}</div>
    </>
  );
};

export default Main;
