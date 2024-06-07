import { useState } from "react";

const useModal = () => {
  const [showModal, setModal] = useState(false); // Initialize modal state to false

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return {
    showModal,
    openModal,
    closeModal,
  };
};

export default useModal;
