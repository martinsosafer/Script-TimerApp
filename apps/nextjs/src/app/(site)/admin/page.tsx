"use client";

import { api } from "~/utils/api";
import Dashboard from "./dashboard";

export default function AdminPage() {
  const { data: userList, isLoading, isError } = api.user.list.useQuery();
  console.log("userList", userList);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !userList) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className=" mt-9">
      <Dashboard userList={userList} />
    </div>
  );
}
