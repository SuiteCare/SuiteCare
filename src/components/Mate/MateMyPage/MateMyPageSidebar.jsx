import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { arrow, user, resume } from '@/assets/sidebar';
import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label, icon }) => (
  <div className={styles.menuItem}>
    <Link href={url}>
      <Image src={icon.image} alt={icon.alt} />
      <span>{label}</span>
    </Link>
  </div>
);

const MateMyPageSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const defaultUrl = '/mate/mypage';

  const menuItems = [
    {
      key: 'resume',
      label: '메이트 이력서',
      url: `${defaultUrl}/resume`,
      icon: { image: resume, alt: 'resume' },
    },
    {
      key: 'mypage',
      label: '내 정보 수정',
      url: `${defaultUrl}/mypage`,
      icon: { image: user, alt: 'mypage' },
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}>
        <h3>마이페이지</h3>
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

export default MateMyPageSidebar;
