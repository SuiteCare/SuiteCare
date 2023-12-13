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

  const handleMenuItemClick = (menuName, href) => {
    setSelectedMenuItem(menuName);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <header className={styles.header}>
      <nav className={styles.nav_wrap}>
        <button className={styles.mobile_btn} onClick={toggleNav}>
          <span />
          <span />
          <span />
        </button>

        <ul id='nav' className={`${styles.nav} ${navVisible ? styles.visible : ''}`}>
          {menuList.map((menu) => (
            <li key={menu.name}>
              <span
                className={`${selectedMenuItem === menu.name ? 'selected' : ''}`}
                onClick={() => handleMenuItemClick(menu.name, menu.href)}
              >
                {menu.name}
              </span>
            </li>
          ))}
          <li>
            <span>
              <Link href='/login'>Login</Link>
            </span>
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
                <h2>간병 신청하기</h2>
              </Link>
              <Link href='/mate/login' className='button btn suiteMate-btn'>
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
