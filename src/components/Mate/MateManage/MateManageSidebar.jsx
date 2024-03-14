import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrow from '@/assets/arrow.svg';
import calender from '@/assets/sidebar/calender.svg';
import offer from '@/assets/sidebar/offer.svg';
import list from '@/assets/sidebar/list.svg';
import general from '@/assets/sidebar/general.svg';
import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label, icon }) => (
  <div className={styles.menuItem}>
    <Image src={icon} alt={icon} />
    <Link href={url}>{label}</Link>
  </div>
);

const MateManageSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultUrl = '/mate/manage';

  const menuItems = [
    { key: 'calendar', label: '내 일정 정보', url: `${defaultUrl}/calendar`, icon: calender },
    { key: 'offer', label: '간병 요청 목록', url: `${defaultUrl}/offer`, icon: offer },
    { key: 'apply', label: '공고 지원 목록', url: `${defaultUrl}/apply`, icon: list },
    { key: 'history', label: '전체 내역', url: `${defaultUrl}/history`, icon: general },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}>
        <h3>내 활동관리</h3>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <MenuItem key={item.key} url={item.url} label={item.label} icon={item.icon} />
          ))}
        </div>
      </div>
      <div onClick={toggleSidebar} className={styles.toggleButton}>
        <input type='checkbox' />
        <Image src={arrow} alt='arrowImage' />
      </div>
    </>
  );
};

export default MateManageSidebar;
