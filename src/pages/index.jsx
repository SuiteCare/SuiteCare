import React, { useEffect, createContext } from 'react';
import ReactGA from 'react-ga';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';

import styles from './Home.module.css';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';
import Contact from '@/components/Home/Contact';
import About from '@/components/Home/About';

const Home = () => {
  const {
    data: indexData,
    isError,
    isLoading,
  } = useQuery(['indexData', ''], async () => {
    const response = await axiosInstance.get('./indexData.json');
    return response.data;
  });

  useEffect(() => {
    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className={styles.Home}>
      <StateContext.Provider value={indexData && indexData.main ? indexData : null}>
        <Header data={indexData?.main} />
        <About data={indexData?.about} />
        <Contact data={indexData?.main} />
        <Footer data={indexData?.main} />
      </StateContext.Provider>
    </div>
  );
};

export const StateContext = createContext();
export default Home;
