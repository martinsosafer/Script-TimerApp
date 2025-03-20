import { useEffect, useState } from "react";

import { api } from "~/utils/api";

export function useSubscription() {
  const { data: subscriptionData, refetch } =
    api.subscription.mySubscription.useQuery();
  const [favoriteVoices, setFavoriteVoices] = useState([]);

  useEffect(() => {
    if (subscriptionData?.favorite_voices) {
      setFavoriteVoices(subscriptionData.favorite_voices);
    }
  }, [subscriptionData]);

  const isSubscriptionActive =
    subscriptionData &&
    ["CREATOR", "STUDENT", "BUSINESS", "1", "2"].includes(
      String(subscriptionData.tier) ?? subscriptionData.plan,
    );

  const refreshSubscriptionData = () => {
    refetch();
  };

  return {
    subscriptionData,
    favoriteVoices,
    isSubscriptionActive,
    refreshSubscriptionData,
  };
}
