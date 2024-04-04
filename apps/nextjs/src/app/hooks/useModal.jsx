import { useEffect, useState } from "react";

const useModal = (isSubscriptionActive) => {
  const [showModal, setModal] = useState(!isSubscriptionActive); // Show modal if not subscribed

  useEffect(() => {
    setModal(!isSubscriptionActive); // Update modal visibility when subscription status changes
  }, [isSubscriptionActive]);

  const closeModal = () => {
    setModal(false);
  };

  return {
    showModal,
    closeModal,
  };
};

export default useModal;
