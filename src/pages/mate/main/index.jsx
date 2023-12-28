import Header from '@/components/Mate/MateHeader/MateHeader';
import MenuList from '@/components/Mate/MateHeader/MateMenuList';
import MainCard from '@/components/Common/Main/MainCard';
import styles from '@/pages/main.module.css';
import { useRouter } from 'next/router';

const Main = () => {
  const navigator = useRouter();

  const navigateTo = (url) => {
    navigator.push(`/${url}`);
  };

  const cards = MenuList.map((e, index) => (
    <MainCard key={index} title={e.title} description={e.description} onClick={() => navigateTo(`mate/${e.url}`)} />
  ));

  return (
    <>
      <Header />
      <div className={`${styles.Main} ${styles.Mate}`}>{cards}</div>
    </>
  );
};

export default Main;
