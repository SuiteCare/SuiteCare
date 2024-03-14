import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { arrow, calender, offer, list, general } from '@/assets/sidebar';
import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label, icon }) => (
  <div className={styles.menuItem}>
    <Link href={url}>
      <Image src={icon.image} alt={icon.alt} />
      <span>{label}</span>
    </Link>
  </div>
);

const MateManageSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const defaultUrl = '/mate/manage';

  const menuItems = [
    {
      key: 'calendar',
      label: '내 일정 정보',
      url: `${defaultUrl}/calendar`,
      icon: { image: calender, alt: 'calender' },
    },
    {
      key: 'offer',
      label: '간병 요청 목록',
      url: `${defaultUrl}/offer`,
      icon: { image: offer, alt: 'offer' },
    },
    {
      key: 'apply',
      label: '공고 지원 목록',
      url: `${defaultUrl}/apply`,
      icon: { image: list, alt: 'apply' },
    },
    {
      key: 'history',
      label: '전체 내역',
      url: `${defaultUrl}/history`,
      icon: { image: general, alt: 'history' },
    },
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
        <Image src={arrow} alt='arrowImage' width={30} height={30} />
      </div>
    </>
  );
};

export default MateManageSidebar;
