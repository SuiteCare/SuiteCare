import Image from 'next/image';

import styles from './Modal.module.css';
import loadingImg from '@/assets/Loading.svg';

const Loading = () => {
  return (
    <div className={styles.Modal}>
      <Image src={loadingImg} alt='Loading' height={200} width={200} style={{ width: '100px' }} />
    </div>
  );
};

export default Loading;
