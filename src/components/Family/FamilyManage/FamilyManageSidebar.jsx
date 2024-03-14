import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import arrow from '@/assets/arrow.svg';
import general from '@/assets/sidebar/general.svg';
import list from '@/assets/sidebar/list.svg';
import calender from '@/assets/sidebar/calender.svg';
import calenderCheck from '@/assets/sidebar/calenderCheck.svg';
import waitList from '@/assets/sidebar/waitList.svg';
import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label, icon }) => (
  <div className={styles.menuItem}>
    <Link href={url}>
      <Image src={icon.image} alt={icon.alt} />
      <span>{label}</span>
    </Link>
  </div>
);

const FamilyManageSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const defaultUrl = '/family/manage';

  const menuItems = [
    {
      key: 'calendar',
      label: '내 일정 정보',
      url: `${defaultUrl}/calendar`,
      icon: { image: calender, alt: 'calender' },
    },
    {
      key: 'reservation',
      label: '간병예약 확정',
      url: `${defaultUrl}/reservation`,
      icon: { image: calenderCheck, alt: 'reservation' },
    },
    {
      key: 'patient_list',
      label: '내 환자 목록',
      url: `${defaultUrl}/patient_list`,
      icon: { image: list, alt: 'patient_list' },
    },
    {
      key: 'pending_payments',
      label: '결제 대기 목록',
      url: `${defaultUrl}/pending_payments`,
      icon: { image: waitList, alt: 'pending_payments' },
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

export default FamilyManageSidebar;
