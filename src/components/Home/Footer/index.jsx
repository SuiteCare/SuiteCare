import { Fade } from 'react-reveal';
import Link from 'next/link';

import styles from './Footer.module.css';

const Footer = ({ data }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <Fade bottom>
          <div className={styles.twelve}>
            <ul>
              {data?.social.map((network) => {
                return (
                  <li key={network.name}>
                    <a href={network.url}>
                      <i className={network.className}></i>
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className={styles.copyright}>
              <li>&copy; Copyright 2023 Nordic Giant</li>
              <li>
                Design by{' '}
                <a title='Styleshout' href='http://www.styleshout.com/'>
                  Styleshout
                </a>
              </li>
            </ul>
          </div>
        </Fade>

        <div className={styles.go_top}>
          <Link className='smoothscroll' title='Back to Top' href='#home'>
            <i className='icon-up-open'></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
