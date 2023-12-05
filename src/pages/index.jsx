import React, { useState, useEffect, createContext } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';

import styles from './Home.module.css';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';
import Contact from '@/components/Home/Contact';
import About from '@/components/Home/About';

const Home = () => {
  const [indexData, setIndexData] = useState(Object);

  useEffect(() => {
    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);
    getIndexData();
  }, []);

  const getIndexData = async () => {
    try {
      const response = await axios.get('./indexData.json');
      const data = response.data;
      setIndexData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={styles.Home}>
      <StateContext.Provider vaule={indexData}>
        <Header data={indexData.main} />
        <About data={indexData.about} />
        <Contact data={indexData.main} />
        <Footer data={indexData.main} />
      </StateContext.Provider>
    </div>
  );
};

export const StateContext = createContext();
export default Home;
