import React, { useState } from 'react';
import styles from './HeaderCore.module.css';
import Logo from '@/assets/logo-white.png';
import Dropdown from './Dropdown';
import Link from 'next/link';
import Image from 'next/image';

const HeaderCore = ({ type }) => {
  const [familyMenuOpen, setFamilyMenuOpen] = useState(false);
  const [mateMenuOpen, setMateMenuOpen] = useState(false);

  const toggleMenu = ($type) => {
    if ($type === 'family') {
      setFamilyMenuOpen(!familyMenuOpen);
      setMateMenuOpen(false);
    } else if ($type === 'mate') {
      setMateMenuOpen(!mateMenuOpen);
      setFamilyMenuOpen(false);
    }
  };

  return (
    <div className={styles.HeaderCore}>
      <Link className={styles.logo} href={`/${type}/main`}>
        <Image src={Logo} alt='Logo' />
      </Link>
      <div className='nav_wrapper'>
        <ul className='menu_wrapper'>
          <li>
            <button onClick={() => toggleMenu('family')} className={`${type === 'family' ? 'active' : ''}`}>
              간병인 찾기
            </button>
            <Dropdown type='family' isOpen={familyMenuOpen} />
          </li>
          <li>
            <button onClick={() => toggleMenu('mate')} className={`${type === 'mate' ? 'active' : ''}`}>
              간병 일감 찾기
            </button>
            <Dropdown type='mate' isOpen={mateMenuOpen} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderCore;
