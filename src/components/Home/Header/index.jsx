import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Fade } from 'react-reveal';
import Image from 'next/image';

import downArrow from '@/assets/down-arrow.png';
import styles from './Header.module.css';

const throttle = (func, limit) => {
  let inThrottle;
  return () => {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Header = ({ data }) => {
  const [navVisible, setNavVisibility] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef(null);

  const toggleNav = () => {
    setNavVisibility(!navVisible);
  };

  const menuList = [
    {
      name: 'home',
      href: '#home',
    },
    {
      name: 'about',
      href: '#about',
    },
    {
      name: 'contact',
      href: '#contact',
    },
  ];

  const handleMenuItemClick = (menuName, href) => {
    setSelectedMenuItem(menuName);

    // 클릭한 Link가 가리키는 섹션의 위치로 스크롤
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    const handleScrollThrottled = throttle(handleScroll, 200);

    window.addEventListener('scroll', handleScrollThrottled);

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, [scrollPosition]);

  useEffect(() => {
    const sectionPositions = menuList.reduce((acc, menu) => {
      const targetElement = document.querySelector(menu.href);
      if (targetElement) {
        acc[menu.name] = targetElement.offsetTop;
      }
      return acc;
    }, {});

    const handleSectionColorChange = () => {
      const currentSection = Object.keys(sectionPositions).find(
        (section) => scrollPosition >= sectionPositions[section] && scrollPosition < sectionPositions[section] + 500,
      );

      if (currentSection) {
        setSelectedMenuItem(currentSection);
      }
    };

    window.addEventListener('scroll', handleSectionColorChange);

    return () => {
      window.removeEventListener('scroll', handleSectionColorChange);
    };
  }, [scrollPosition]);

  return (
    <header id='home' className={styles.header} ref={headerRef}>
      <nav className={styles.nav_wrap}>
        <button onClick={toggleNav}>
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.nav} ${navVisible ? styles.visible : ''}`}>
          {menuList.map((menu) => (
            <li key={menu.name}>
              <Link
                href={menu.href}
                className={`${selectedMenuItem === menu.name ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick(menu.name, menu.href)}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.banner}>
        <div className={styles.banner_text}>
          <Fade bottom>
            <h1 className='responsive-headline'>{data?.title}</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h2>{data?.description}.</h2>
          </Fade>
          <hr />
          <Fade bottom duration={2000}>
            <ul>
              <li>
                <Link href='/family/login' className='button btn suiteFamily-btn'>
                  간병 신청 하기
                </Link>
              </li>
              <li>
                <Link href='/mate/login' className='button btn suiteMate-btn'>
                  간병 일감 찾기
                </Link>
              </li>
            </ul>
          </Fade>
        </div>
      </div>

      <p className={styles.scrolldown}>
        <Link href='#about'>
          <Image src={downArrow} />
        </Link>
      </p>
    </header>
  );
};

export default Header;
