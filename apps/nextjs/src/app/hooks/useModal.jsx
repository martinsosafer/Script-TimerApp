import { useEffect, useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // const modalClosedToday = localStorage.getItem('modalClosedToday');
    // const today = new Date().toDateString();
    // const lastModalDate = localStorage.getItem('lastModalDate');

    // if (!modalClosedToday || lastModalDate !== today) {
    setShowModal(true);
    // localStorage.setItem('lastModalDate', today);
    // }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    // localStorage.setItem('modalClosedToday', true);
  };

  return {
    showModal,
    closeModal,
  };
};

export default useModal;
