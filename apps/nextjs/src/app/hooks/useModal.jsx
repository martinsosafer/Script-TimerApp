// useModal.js
import { useEffect, useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Your logic to determine when to show the modal
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    closeModal,
  };
};

export default useModal;
