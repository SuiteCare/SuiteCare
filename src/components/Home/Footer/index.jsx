import { Fade } from 'react-reveal';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Footer.module.css';

const Footer = ({ data }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <Fade bottom>
          <div className={styles.twelve}>
            <ul className={styles.social}>
              {data?.social.map((network) => {
                return (
                  <li key={network.name}>
                    <Link href={network.url}>{network.name}</Link>
                  </li>
                );
              })}
            </ul>

            <ul className={styles.copyright}>
              <li>&copy; Copyright 2023 Nordic Giant</li>
              <li>
                Design by{' '}
                <Link title='Styleshout' href='http://www.styleshout.com/'>
                  Styleshout
                </Link>
              </li>
            </ul>
          </div>
        </Fade>

        <div className={styles.go_top}>
          <Link className='smoothscroll' title='Back to Top' href='#home'>
            TOP
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
