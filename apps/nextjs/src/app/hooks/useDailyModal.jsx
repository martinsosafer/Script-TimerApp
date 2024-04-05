// useDailyModal.js
import { useEffect, useState } from "react";

const useDailyModal = () => {
  const [showDailyModal, setShowDailyModal] = useState(true); // Initialize to true

  useEffect(() => {
    // Your logic to determine when to show the daily modal
    // This logic can be removed since you want the daily modal to always appear
  }, []);

  const closeDailyModal = () => {
    setShowDailyModal(false);
    localStorage.setItem("dailyModalClosedToday", true);
  };

  return {
    showDailyModal,
    closeDailyModal,
  };
};

export default useDailyModal;
