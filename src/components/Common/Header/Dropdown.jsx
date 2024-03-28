import React from 'react';
import { Fade } from 'react-reveal';
import Link from 'next/link';

import useLoginInfo from '@/hooks/useLoginInfo';

import FamilyMenuList from '@/components/Family/FamilyHeader/FamilyMenuList.js';
import MateMenuList from '@/components/Mate/MateHeader/MateMenuList.js';
import styles from './Dropdown.module.css';

const Dropdown = ({ type, isOpen }) => {
  const menuItems = ($type) => {
    const menuList = $type === 'family' ? FamilyMenuList : MateMenuList;
    return menuList.map((item) => (
      <li key={item.url} className='dropdown_menu_item'>
        <Link href={`/${$type}/${item.url}`}>{item.title}</Link>
      </li>
    ));
  };

  const { role } = useLoginInfo();

  const renderMenus = ($type) => {
    const roleString = role === 'M' ? 'mate' : role === 'F' ? 'family' : null;
    const menus = menuItems($type);
    const loginMenu = (
      <li key='login' className='dropdown_menu_item'>
        <Link href={`/${type}/login`}>로그인</Link>
      </li>
    );
    const logoutMenu = (
      <li key='logout' className='dropdown_menu_item'>
        <Link href='/logout'>로그아웃</Link>
      </li>
    );

    if ($type === roleString) {
      return [...menus, logoutMenu];
    }
    return [loginMenu, ...menus];
  };

  return (
    <div className={styles.Dropdown}>
      <Fade top cascade when={isOpen}>
        <ul className='dropdown_menu'>{renderMenus(type)}</ul>
      </Fade>
    </div>
  );
};

export default Dropdown;
