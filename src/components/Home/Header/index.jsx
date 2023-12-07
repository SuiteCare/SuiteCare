import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';

import styles from './header.module.css';

const Header = ({ data }) => {
  if (!data) return null;

  const [navVisible, setNavVisibility] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleMenuItemClick = (menuName) => {
    setSelectedMenuItem(menuName);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 각 섹션의 위치를 알아내는 로직
    const sectionPositions = menuList.reduce((acc, menu) => {
      const targetElement = document.querySelector(menu.href);
      if (targetElement) {
        acc[menu.name] = targetElement.offsetTop;
      }
      return acc;
    }, []);

    // 현재 스크롤 위치가 어떤 섹션에 도달했는지 확인하고 색상 변경
    const handleSectionColorChange = () => {
      const currentSection = Object.keys(sectionPositions).find(
        (section) => scrollPosition >= sectionPositions[section] && scrollPosition < sectionPositions[section] + 100,
      );

      if (currentSection) {
        setSelectedMenuItem(currentSection);
      }
    };

    // 스크롤 이벤트 핸들러 등록
    window.addEventListener('scroll', handleSectionColorChange);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('scroll', handleSectionColorChange);
    };
  }, [scrollPosition]);

  return (
    <header id='home' className={styles.header}>
      <nav id='nav-wrap'>
        <button className='mobile-btn' onClick={toggleNav} title='Toggle navigation'>
          Toggle navigation
        </button>

        <ul id='nav' className='nav'>
          {menuList.map((menu) => (
            <li
              key={menu.name}
              className={`${selectedMenuItem === menu.name ? 'selected' : ''}`}
              onClick={() => handleMenuItemClick(menu.name)}
            >
              <Link className='smoothscroll' href={menu.href}>
                {menu.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href='/login'>Login</Link>
          </li>
        </ul>
      </nav>

      <div className='row banner'>
        <div className='banner-text'>
          <Fade bottom>
            <h1 className='responsive-headline'>{data?.title}</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h3>{data?.description}.</h3>
          </Fade>
          <hr />
          <Fade bottom duration={2000}>
            <ul className='index-btn'>
              <Link href='/family/login' className='button btn suiteFamily-btn'>
                {/* <img src={findMate} alt='findMate' /> */}
                <h2>간병 신청하기</h2>
              </Link>
              <Link href='/mate/login' className='button btn suiteMate-btn'>
                {/* <img src={findWork} alt='findWork' /> */}
                <h2>간병 일감 찾기</h2>
              </Link>
            </ul>
          </Fade>
        </div>
      </div>

      <p className='scrolldown'>
        <Link className='smoothscroll' href='#about'>
          <i className='icon-down-circle'></i>
        </Link>
      </p>
    </header>
  );
};

export default Header;
