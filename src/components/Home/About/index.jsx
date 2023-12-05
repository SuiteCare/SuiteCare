import Slide from 'react-reveal';

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section id='about'>
      <Slide left duration={1300}>
        <div className='row about'>
          <div className='three columns header-col'>
            <h1>
              <span>스위트케어는?</span>
            </h1>
          </div>

          <div className='nine columns main-col'>
            <div className='row item'>
              <div className='twelve columns'>
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
          </div>
        </div>
      </Slide>

      <Slide left duration={1300}>
        <div className='row advantages'>
          <div className='three columns header-col'>
            <h1>
              <span>장점</span>
            </h1>
          </div>

          <div className='nine columns main-col'>
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
