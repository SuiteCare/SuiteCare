import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrow from '@/assets/arrow.svg';
import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label }) => (
  <div className={styles.menuItem}>
    <Link href={url}>{label}</Link>
  </div>
);

const MateManageSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultUrl = '/mate/manage';

  const menuItems = [
    { key: 'calendar', label: '내 일정 정보', url: `${defaultUrl}/calendar` },
    { key: 'offer', label: '간병 요청 목록', url: `${defaultUrl}/offer` },
    { key: 'apply', label: '공고 지원 목록', url: `${defaultUrl}/apply` },
    { key: 'history', label: '전체 내역', url: `${defaultUrl}/history` },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}>
      <div onClick={toggleSidebar} className={styles.toggleButton}>
        <input type='checkbox' />
        <Image src={arrow} alt='arrowImage' />
      </div>
      <h3>내 활동관리</h3>
      <div className={styles.menu}>
        {menuItems.map((item) => (
          <MenuItem key={item.key} url={item.url} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default MateManageSidebar;
