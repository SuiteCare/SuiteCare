import { useState } from 'react';
import { Fade, Slide } from 'react-reveal';
import styles from './Contact.module.css';

const Contact = ({ data }) => {
  if (!data) return null;

  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactSubject: '',
    contactMessage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section id='contact' className={styles.contact}>
      <Fade bottom duration={1000}>
        <div className={`${styles.row} ${styles.section_head}`}>
          <div className={styles.column}>
            <p>{data.contactmessage}</p>
          </div>
        </div>
      </Fade>

      <div className={styles.row}>
        <Slide left duration={1000}>
          <div className={styles.column}>
            <form action='' method='post' id='contactForm' name='contactForm'>
              <fieldset>
                <div className={styles.formGroup}>
                  <label htmlFor='contactName'>Name</label>
                  <input
                    type='text'
                    size='35'
                    id='contactName'
                    name='contactName'
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='contactEmail'>Email</label>
                  <input
                    type='text'
                    size='35'
                    id='contactEmail'
                    name='contactEmail'
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='contactSubject'>Subject</label>
                  <input
                    type='text'
                    size='35'
                    id='contactSubject'
                    name='contactSubject'
                    value={formData.contactSubject}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='contactMessage'>Message</label>
                  <textarea
                    cols='50'
                    rows='15'
                    id='contactMessage'
                    name='contactMessage'
                    value={formData.contactMessage}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <button type='submit' className={styles.submit}>
                    Submit
                  </button>
                  <span id='image-loader'>
                    <img alt='' src='images/loader.gif' />
                  </span>
                </div>
              </fieldset>
            </form>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
