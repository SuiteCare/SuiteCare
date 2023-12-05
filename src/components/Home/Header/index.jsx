import Link from 'next/link';
import Fade from 'react-reveal';

const Header = ({ data }) => {
  if (!data) return null;

  return (
    <header id='home'>
      <nav id='nav-wrap'>
        <a className='mobile-btn' href='#nav-wrap' title='Show navigation'>
          Show navigation
        </a>
        <a className='mobile-btn' href='#home' title='Hide navigation'>
          Hide navigation
        </a>

        <ul id='nav' className='nav'>
          <li className='current'>
            <Link className='smoothscroll' href='#home'>
              Home
            </Link>
          </li>

          <li>
            <Link className='smoothscroll' href='#about'>
              About
            </Link>
          </li>

          <li>
            <Link className='smoothscroll' href='#contact'>
              Contact
            </Link>
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
              <a href='/family/login' className='button btn suiteFamily-btn'>
                {/* <img src={findMate} alt='findMate' /> */}
                <h2>간병 신청하기</h2>
              </a>
              <a href='/mate/login' className='button btn suiteMate-btn'>
                {/* <img src={findWork} alt='findWork' /> */}
                <h2>간병 일감 찾기</h2>
              </a>
            </ul>
          </Fade>
        </div>
      </div>

      <p className='scrolldown'>
        <a className='smoothscroll' href='#about'>
          <i className='icon-down-circle'></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
