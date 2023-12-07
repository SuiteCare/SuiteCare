import { useState } from 'react';
import { Fade, Slide } from 'react-reveal';
import envelop from '@/assets/envelope-arrow-up-fill.svg';
import Image from 'next/image';

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
    <section id='contact'>
      <Fade bottom duration={1000}>
        <div className='row section-head'>
          <div className='two columns header-col'>
            <h1>
              <span>메일 보내기</span>
            </h1>
          </div>

          <div className='ten columns'>
            <p className='lead'>{data.contactmessage}</p>
          </div>
        </div>
      </Fade>

      <div className='row'>
        <Slide left duration={1000}>
          <div className='eight columns'>
            <form action='' method='post' id='contactForm' name='contactForm'>
              <fieldset>
                <div>
                  <label htmlFor='contactName'>
                    Name <span className='required'>*</span>
                  </label>
                  <input
                    type='text'
                    defaultValue=''
                    size='35'
                    id='contactName'
                    name='contactName'
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor='contactEmail'>
                    Email <span className='required'>*</span>
                  </label>
                  <input
                    type='text'
                    defaultValue=''
                    size='35'
                    id='contactEmail'
                    name='contactEmail'
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor='contactSubject'>Subject</label>
                  <input
                    type='text'
                    defaultValue=''
                    size='35'
                    id='contactSubject'
                    name='contactSubject'
                    value={formData.contactSubject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor='contactMessage'>
                    Message <span className='required'>*</span>
                  </label>
                  <textarea
                    cols='50'
                    rows='15'
                    id='contactMessage'
                    name='contactMessage'
                    value={formData.contactMessage}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div>
                  <button className='submit'>Submit</button>
                  <span id='image-loader'>
                    <img alt='' src='images/loader.gif' />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id='message-warning'> Error boy</div>
            <div id='message-success'>
              <i className='fa fa-check'></i>Your message was sent, thank you!
              <br />
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
