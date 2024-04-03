import { useEffect, useState } from "react";

const useModal = (initialShow = false) => {
  const [showModal, setShowModal] = useState(initialShow);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    openModal,
    closeModal,
  };
};

export default useModal;
