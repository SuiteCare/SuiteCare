import React from 'react';
import Image from 'next/image';

import styles from './LocalLoading.module.css';
import loadingImg from '@/assets/Loading.svg';

const LocalLoading = () => {
  return (
    <div className={styles.LocalLoading}>
      <Image src={loadingImg} alt='Loading' height={160} width={160} style={{ width: '80px' }} />
    </div>
  );
};

export default LocalLoading;
