import { useEffect, useState } from "react";

import { api } from "~/utils/api";

export function useSubscriptionData() {
  const { data: subscriptionData, refetch } =
    api.subscription.mySubscription.useQuery();
  const [favoriteVoices, setFavoriteVoices] = useState([]);

  useEffect(() => {
    if (subscriptionData?.favorite_voices) {
      setFavoriteVoices(subscriptionData.favorite_voices);
    }
  }, [subscriptionData]);

  return {
    subscriptionData,
    favoriteVoices,
    refreshSubscriptionData: refetch,
    isSubscriptionActive:
      subscriptionData &&
      (subscriptionData.status === "CREATOR" ||
        subscriptionData.status === "STUDENT" ||
        subscriptionData.status === "BUSINESS"),
  };
}
