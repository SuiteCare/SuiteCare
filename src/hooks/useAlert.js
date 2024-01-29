import { useState } from 'react';

import Alert from '@/components/Common/Modal/Alert';

const useAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertCondition, setAlertCondition] = useState({
    message: '',
    duration: 0,
  });

  const openAlert = (message, duration = 3) => {
    setAlertCondition({
      message,
      duration,
    });
    setIsAlertVisible(true);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  const alertComponent = isAlertVisible && <Alert key={Date.now()} {...alertCondition} closeAlert={closeAlert} />;

  return {
    openAlert,
    alertComponent,
  };
};

export default useAlert;
