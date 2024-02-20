import { useState } from 'react';

import Alert from '@/components/Common/Modal/Alert';

const useAlert = () => {
  const [alertCondition, setAlertCondition] = useState({
    message: '',
    duration: 0,
  });

  const [isActive, setIsActive] = useState(false);

  const openAlert = (message, duration = 3) => {
    setAlertCondition({
      message,
      duration,
    });
    setIsActive(true);
  };

  const closeAlert = () => {
    setIsActive(false);
  };

  const alertComponent = (
    <Alert isActive={isActive} setIsActive={setIsActive} {...alertCondition} closeAlert={closeAlert} />
  );

  return {
    openAlert,
    alertComponent,
  };
};

export default useAlert;
