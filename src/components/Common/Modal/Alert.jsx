import React, { useEffect } from 'react';

import styles from './Alert.module.css';

const Alert = ({ message, duration, closeAlert, isActive, setIsActive }) => {
  const animationTime = 3000; // ms

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setIsActive(false), animationTime);
      const timeoutObj = setTimeout(() => {
        setIsActive(false);
        setTimeout(closeAlert, duration * 1000 - animationTime * 2);
      }, duration * 1000);

      return () => clearTimeout(timeoutObj);
    }
  }, [isActive, duration]);

  return <div className={`${styles.Alert} ${isActive ? styles.active : ''}`}>{message}</div>;
};

export default Alert;
