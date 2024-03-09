import { useRouter } from 'next/router';

import styles from '@/pages/main.module.css';

const MainCard = ({ menu }) => {
  const navigator = useRouter();

  const navigateTo = (url) => {
    navigator.push(`/${url}`);
  };

  return (
    <div className={styles.MainCard} onClick={() => navigateTo(`family/${menu.url}`)}>
      <div className={styles.title_description_wrapper}>
        <p>{menu.title}</p>
        <span>{menu.description}</span>
      </div>
    </div>
  );
};

export default MainCard;
