import { Slide } from 'react-reveal';

import styles from './About.module.css';

const About = ({ data }) => {
  return (
    <section id='about' className={styles.about}>
      <Slide left duration={1000}>
        <div className={styles.row}>
          <div className={styles.columns}>
            <h2>
              <span>스위트케어는?</span>
            </h2>
          </div>

          <div className={styles.columns}>
            {data?.about.map((about) => {
              return (
                <div key={about.title}>
                  <h3>{about.title}</h3>
                  <p>{about.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      <Slide left duration={1500}>
        <div className={styles.row}>
          <div className={styles.columns}>
            <h2>
              <span>장점</span>
            </h2>
          </div>

          <div className={styles.columns}>
            {data?.advantages.map((advantages) => {
              return (
                <div key={advantages.title}>
                  <h3>{advantages.title}</h3>
                  <p>{advantages.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Slide>
    </section>
  );
};

export default About;
