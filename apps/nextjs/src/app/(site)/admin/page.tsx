"use client";

import { api } from "~/utils/api";
import Dashboard from "./dashboard";

export default function AdminPage() {
  const {
    data: userList,
    isLoading,
    isError,
    refetch,
  } = api.user.list.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !userList) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className=" mt-9">
      <Dashboard userList={userList} refetch={refetch} />
    </div>
  );
}
