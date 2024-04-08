import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import useLoginInfo from '@/hooks/useLoginInfo';

import styles from './HeaderCore.module.css';
import Logo from '@/assets/logo-white.png';
import Dropdown from './Dropdown';
import MenuRoute from './MenuRoute';

const HeaderCore = ({ type, isCheckLogin = true }) => {
  const [menuOpen, setMenuOpen] = useState({ family: false, mate: false });
  const { id } = useLoginInfo();
  const wrapperRef = useRef(null);

  // 메뉴가 열린 상태에서 메뉴 이외의 영역이 클릭되면 메뉴를 끄게 함
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen({ family: false, mate: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const toggleMenu = (menuType) => {
    setMenuOpen((prevMenuOpen) => ({
      ...Object.fromEntries(
        Object.keys(prevMenuOpen).map((key) => [key, key === menuType ? !prevMenuOpen[key] : false]),
      ),
    }));
  };

  const menuButtons = [
    { role: 'family', text: '간병인 찾기' },
    { role: 'mate', text: '간병 일감 찾기' },
  ];

  const renderLogoHref = () => {
    if (typeof window !== 'undefined') {
      const location = window.location.pathname.split('/').reverse()[0];
      if (location === 'login') return '/';
    }
    return id ? `/${type}/main` : `/${type}/login`;
  };

  return (
    <div className={styles.HeaderCore}>
      <Link className={styles.logo} href={renderLogoHref()}>
        <Image src={Logo} alt='Logo' />
      </Link>
      <div className={styles.menu_wrapper} ref={wrapperRef}>
        {menuButtons.map(({ role, text }) => (
          <div key={role} className={styles.button_wrapper}>
            <button
              onClick={() => toggleMenu(role)}
              className={`${role === 'family' && type === 'family' ? styles.active : ''} ${
                role === 'mate' && type === 'mate' ? styles.active : ''
              } ${role}-button`}
            >
              <span className={styles.buttonText}>{text}</span>
            </button>
            {menuOpen[role] && <Dropdown type={role} />}
          </div>
        ))}
      </div>
      {isCheckLogin && <MenuRoute type={type} />}
    </div>
  );
};

export default HeaderCore;
