import { useState, useEffect } from 'react';

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleBodyOverflow = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isModalVisible ? 'hidden' : 'auto';
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    handleBodyOverflow();

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isModalVisible]);

  return {
    isModalVisible,
    openModal,
    closeModal,
    handleContentClick,
  };
};

export default useModal;
