"use client";

import React, { useState } from "react";

import { IconCopy } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";
import AddPlanIdModal from "../../components/modals/add-plan-id";
import { addPlanId } from "../actions";
import AdminFilters from "../filters";
import { daysSinceCreated, daysWithCurrentPlan } from "../helpers";

export interface UserData {
  name: string | null;
  email: string;
  id: string;
  created_at: Date;
  updated_at: Date | null;
  status:
    | "ACTIVE"
    | "INACTIVE"
    | "STUDENT"
    | "CREATOR"
    | "FREE_TRIAL"
    | "PAUSED"
    | "FREE"
    | "BUSINESS"
    | null;
  plan_id: string | null;
  cl_credits: number | null;
  eleven_labs_credits: number | null;
  open_ai_credits: number | null;
}

interface DashboardProps {
  userList: UserData[];
  refetch: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userList, refetch }) => {
  const [filteredList, setFilteredList] = useState<UserData[]>(userList);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isCreationAscending, setIsCreationAscending] = useState<boolean>(true);

  const [isAddingPlanId, setIsAddingPlanId] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<undefined | string>(
    undefined,
  );

  const { mutateAsync: giveFreeTrial } = api.user.giveFreeTrial.useMutation({
    onSuccess(data) {
      console.log("Free trial given successfully:", data);
    },
    onError(error) {
      console.error("Error giving free trial:", error);
    },
  });

  const { mutateAsync: updateStudent } = api.user.updateStudent.useMutation({
    onSuccess(data) {
      console.log("Free trial given successfully:", data);
    },
    onError(error) {
      console.error("Error giving free trial:", error);
    },
  });

  const { mutateAsync: updateCreator } = api.user.updateCreator.useMutation({
    onSuccess(data) {
      console.log("Free trial given successfully:", data);
    },
    onError(error) {
      console.error("Error giving free trial:", error);
    },
  });

  const { mutateAsync: updateBusiness } = api.user.updateBusiness.useMutation({
    onSuccess(data) {
      console.log("Free trial given successfully:", data);
    },
    onError(error) {
      console.error("Error giving free trial:", error);
    },
  });

  const { mutateAsync: cancelSubscription } =
    api.user.cancelSubscription.useMutation({
      onSuccess(data) {
        console.log("Free trial given successfully:", data);
      },
      onError(error) {
        console.error("Error giving free trial:", error);
      },
    });

  async function handleSubscription(userId: string, selectedStatus: string) {
    try {
      if (selectedStatus === "FREE_TRIAL") {
        await giveFreeTrial({ userId });
      } else if (selectedStatus === "STUDENT") {
        await updateStudent({ userId });
      } else if (selectedStatus === "CREATOR") {
        await updateCreator({ userId });
      } else if (selectedStatus === "BUSSINES") {
        await updateBusiness({ userId });
      } else if (selectedStatus === "FREE") {
        await cancelSubscription({ userId });
      }
      refetch();
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  }

  const toggleSortOrder = () => {
    const sortedList = [...filteredList].sort((a, b) => {
      if (isAscending) {
        return (
          daysWithCurrentPlan(a.updated_at ?? new Date()) -
          daysWithCurrentPlan(b.updated_at ?? new Date())
        );
      } else {
        return (
          daysWithCurrentPlan(a.updated_at ?? new Date()) +
          daysWithCurrentPlan(b.updated_at ?? new Date())
        );
      }
    });

    setFilteredList(sortedList);
    setIsAscending(!isAscending);
  };

  const toggleCreationSortOrder = () => {
    const sortedList = [...filteredList].sort((a, b) => {
      if (isCreationAscending) {
        return daysSinceCreated(a.created_at) - daysSinceCreated(b.created_at);
      } else {
        return daysSinceCreated(a.created_at) + daysSinceCreated(b.created_at);
      }
    });

    setFilteredList(sortedList);
    setIsCreationAscending(!isCreationAscending);
  };

  return (
    <div className="mb-12 flex flex-col items-center overflow-x-scroll p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <AdminFilters setFilteredList={setFilteredList} userList={userList} />
      <div>
        <div className="flex w-max bg-gray-100">
          <div className="flex w-[220px] min-w-[220px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            Name
          </div>
          <div className="flex w-[330px] min-w-[330px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold ">
            Email
          </div>
          <div className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-2 py-2 text-center font-semibold">
            Create on
          </div>
          <div className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            Current Plan
          </div>
          <div className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            CL Credits Used
          </div>
          <div className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            11 Credits Used
          </div>
          <div className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            OpenAi Credits Used
          </div>
          <div className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            <button onClick={toggleSortOrder}>
              Days with Current Plan {isAscending ? "↑" : "↓"}
            </button>
          </div>
          <div className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            <button onClick={toggleCreationSortOrder}>
              Days Since Creation {isCreationAscending ? "↑" : "↓"}
            </button>
          </div>
          <div className="flex w-[160px] min-w-[160px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            Actions
          </div>
          <div className="flex w-[290px] min-w-[290px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            Subscription ID
          </div>
          <div className="flex w-[80px] min-w-[80px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            ID
          </div>
        </div>

        <div className="h-[600px] w-max overflow-y-scroll border">
          <div className="flex w-full flex-col items-center">
            {filteredList.map((user) => (
              <div key={user.id} className="flex">
                <div className="flex w-[220px] min-w-[220px] items-center border px-4 py-2">
                  {user.name}
                </div>
                <div className="flex w-[330px] min-w-[330px] items-center overflow-auto border p-2">
                  {user.email}
                </div>
                <div className="flex w-[100px] min-w-[100px] items-center border px-2 py-2">
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
                <div className="flex w-[120px] min-w-[120px] items-center border px-4 py-2">
                  {user.status}
                </div>

                <div className="flex w-[100px] min-w-[100px] items-center border px-2 py-2">
                  {user.cl_credits}
                </div>
                <div className="flex w-[100px] min-w-[100px] items-center border px-2 py-2">
                  {user.eleven_labs_credits}
                </div>
                <div className="flex w-[100px] min-w-[100px] items-center border px-2 py-2">
                  {user.open_ai_credits}
                </div>
                <div className="flex w-[120px] min-w-[100px] items-center border px-2 py-2">
                  {daysWithCurrentPlan(user.updated_at ?? new Date())}
                </div>
                <div className="flex w-[120px] min-w-[100px] items-center border px-2 py-2">
                  {daysSinceCreated(user.created_at)}
                </div>
                <div className="flex w-[160px] min-w-[160px] items-center justify-center border px-1 py-2">
                  <select
                    value={user?.status ?? ""}
                    onChange={async (e) => {
                      const selectedStatus = e.target.value;
                      if (selectedStatus === "EXTEND") return;
                      await handleSubscription(user.id, selectedStatus);
                    }}
                    className="mr-2 rounded-lg border border-gray-300 px-2 py-1"
                  >
                    <option value="">Select</option>
                    <option value="ACTIVE">Activate</option>
                    <option value="FREE">Free</option>
                    <option value="STUDENT">Student</option>
                    <option value="CREATOR">Creator</option>
                    <option value="BUSINESS">Business</option>
                    <option value="FREE_TRIAL">Free Trial</option>
                    <option value="EXTEND">Extend Free Trial</option>
                  </select>
                </div>
                <button
                  className="flex w-[290px] min-w-[290px] items-center justify-center overflow-auto border px-2 py-2"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setIsAddingPlanId(true);
                  }}
                >
                  {user.plan_id}
                </button>
                <button
                  id="copyBtn"
                  className="flex w-[80px] min-w-[80px] items-center justify-center border px-4 py-2"
                  onClick={async () => {
                    await navigator.clipboard.writeText(user?.id ?? "");
                    toast({
                      title: "Id Copied",
                      description: "User Id copied to clipboard",
                    });
                  }}
                >
                  <IconCopy className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAddingPlanId && (
        <AddPlanIdModal
          onClose={() => setIsAddingPlanId(false)}
          onSave={addPlanId}
          userId={selectedUserId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
