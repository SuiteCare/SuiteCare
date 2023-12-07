import React from 'react';
import { Fade } from 'react-reveal';
import FamilyMenuList from '@/components/Family/FamilyHeader/FamilyMenuList';
import MateMenuList from '@/components/Mate/MateHeader/MateMenuList';
import styles from './Dropdown.module.css';
import Link from 'next/link';

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
      <Fade top cascade>
        <ul className='dropdown_menu'>{menuItems(type)}</ul>
      </Fade>
    </div>
  );
};

export default Dropdown;
