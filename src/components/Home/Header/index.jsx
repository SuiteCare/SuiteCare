import Link from 'next/link';
import Fade from 'react-reveal';

const Header = ({ data }) => {
  if (!data) return null;

  return (
    <header id='home'>
      <nav id='nav-wrap'>
        <Link className='mobile-btn' href='#nav-wrap' title='Show navigation'>
          Show navigation
        </Link>
        <Link className='mobile-btn' href='#home' title='Hide navigation'>
          Hide navigation
        </Link>

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
