import React from 'react';
import { Fade } from 'react-reveal';
import Link from 'next/link';

import useLoginInfo from '@/hooks/useLoginInfo';

import FamilyMenuList from '@/components/Family/FamilyHeader/FamilyMenuList.js';
import MateMenuList from '@/components/Mate/MateHeader/MateMenuList.js';
import styles from './Dropdown.module.css';

const Dropdown = ({ type }) => {
  const menuItems = ($type) => {
    const menuList = $type === 'family' ? FamilyMenuList : MateMenuList;
    return menuList.map((item) => (
      <li key={item.url} className='dropdown_menu_item'>
        <Link href={`/${$type}/${item.url}`}>{item.title}</Link>
      </li>
    ));
  };

  const { role } = useLoginInfo();

  const getRoleString = () => {
    if (role === 'F') {
      return 'family';
    }
    if (role === 'M') {
      return 'mate';
    }
    return null;
  };

  const handleLoginClick = (e) => {
    if (localStorage.getItem('login_info')) {
      if (window.confirm('로그인 페이지로 이동하시겠습니까? 기존 계정에서 로그아웃됩니다.')) {
        localStorage.removeItem('login_info');
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiration_time');
      } else {
        navigator.back();
      }
    }
  };

  const renderMenus = ($type) => {
    const roleString = getRoleString();
    const menus = menuItems($type);
    const loginMenu = (
      <li key='login' className='dropdown_menu_item'>
        <Link href={`/${type}/login`} onClick={handleLoginClick}>
          로그인
        </Link>
      </li>
    );
    const logoutMenu = (
      <li key='logout' className='dropdown_menu_item'>
        <Link href='/logout'>로그아웃</Link>
      </li>
    );

    if ($type === roleString || role === 'A') {
      return [...menus, logoutMenu];
    }
    return [loginMenu, ...menus];
  };

  return (
    <div className={styles.Dropdown}>
      <Fade top cascade>
        <ul className='dropdown_menu'>{renderMenus(type)}</ul>
      </Fade>
    </div>
  );
};

export default Dropdown;
