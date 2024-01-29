import React, { useEffect, useState } from 'react';

import styles from './Alert.module.css';

const Alert = ({ message, duration, closeAlert }) => {
  const [isActive, setIsActive] = useState(false);

  const animationTime = 500; // ms

  useEffect(() => {
    setTimeout(setIsActive(true), animationTime);
    const timeoutObj = setTimeout(() => {
      setIsActive(false);
      setTimeout(closeAlert, duration * 1000 - animationTime * 2);
    }, duration * 1000);

    return () => clearTimeout(timeoutObj);
  }, [message]);

  return <div className={`${styles.Alert} ${isActive ? styles.active : ''}`}>{message}</div>;
};

export default Alert;
