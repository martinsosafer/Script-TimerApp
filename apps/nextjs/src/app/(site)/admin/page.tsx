"use client";

import { useParams } from "next/navigation";

import Dashboard from "~/app/_components/dashboard";
import { api } from "~/utils/api";

export default function AdminPage() {
  const { data: userList, isLoading, isError } = api.user.list.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  console.log("USERS", userList);
  return (
    <div className=" mt-9">
      <Dashboard userList={userList} />
    </div>
  );
}
