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
            <button onClick={() => toggleMenu('mate')} className={`${type === 'mate' ? 'active' : ''} mate-button`}>
              간병 일감 찾기
            </button>
            {mateMenuOpen && <Dropdown type='mate' isOpen={true} />}
            <button className='family-button' onClick={() => toggleMenu('family')} className={`${type === 'family' ? 'active' : ''} family-button`}>
            <span className={styles.buttonText}>간병인 찾기</span>
            </button>
            {familyMenuOpen && <Dropdown type='family' isOpen={true} />}
        </ul>
      </div>
    </div>
  );
};

export default HeaderCore;