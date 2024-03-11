import React from 'react';
import { Fade } from 'react-reveal';
import Link from 'next/link';

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

  return (
    <div className={styles.Dropdown}>
      <Fade top cascade when={isOpen}>
        <ul className='dropdown_menu'>
          {menuItems(type)}
          <li key='logout' className='dropdown_menu_item'>
            <Link href='/logout'>로그아웃</Link>
          </li>
        </ul>
      </Fade>
    </div>
  );
};

export default Dropdown;
