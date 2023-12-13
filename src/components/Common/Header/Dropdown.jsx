import React, { useState, useEffect, useRef } from 'react';
import { Fade } from 'react-reveal';
import FamilyMenuList from '@/components/Family/FamilyHeader/FamilyMenuList.js';
import MateMenuList from '@/components/Mate/MateHeader/MateMenuList.js';
import styles from './Dropdown.module.css';
import Link from 'next/link';

const Dropdown = ({ type, isOpen }) => {
  const dropdownRef = useRef(null);
  const [positionStyle, setPositionStyle] = useState({});

useEffect(() => {
  const updatePositionStyle = () => {
    const button = document.querySelector(`.${type}-button`);
    console.log(`${type}-button`)
    const dropdown = dropdownRef.current;
    console.log(button, dropdown)
    if (button && dropdown) {
    console.log('if문 실행됨')
      const rect = button.getBoundingClientRect();
      const left = rect.left + window.pageXOffset;
      const top = rect.top + button.offsetHeight + window.pageYOffset + 19; // 드롭다운 메뉴를 원하는 위치로 이동시키기 위해 값을 조정해주세요.
      setPositionStyle({ top: `${top}px`, left: `${left}px` });
    }
  };

  updatePositionStyle();

  window.addEventListener('resize', updatePositionStyle);
  return () => {
    window.removeEventListener('resize', updatePositionStyle);
  };
}, [type]);

  const menuItems = ($type) => {
    const menuList = $type === 'family' ? FamilyMenuList : MateMenuList;
    return menuList.map((item) => (
      <li key={item.url} className='dropdown_menu_item'>
        <Link href={`/${$type}/${item.url}`}>{item.title}</Link>
      </li>
    ));
  };

  return (
    <div className={styles.Dropdown} style={positionStyle} ref={dropdownRef}>
      <Fade top cascade when={isOpen}>
        <ul className='dropdown_menu'>{menuItems(type)}</ul>
      </Fade>
    </div>
  );
};

export default Dropdown;