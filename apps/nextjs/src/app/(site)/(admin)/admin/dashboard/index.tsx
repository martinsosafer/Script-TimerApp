"use client";

import React, { useState } from "react";

import { IconCopy } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";
import AddPlanIdModal from "../../../components/modals/add-plan-id";
import ExtendFreeTrialModal from "../../../components/modals/extend-free-trial";
import { addPlanId, extendFreeTrial } from "../actions";
import AdminFilters from "../filters";
import { daysSinceCreated, daysWithCurrentPlan, sortHandler } from "../helpers";

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
    | "STUDENTCLMO"
    | "CREATORCLMO"
    | "BUSINESSCLMO"
    | "STUDENTCLYR"
    | "CREATORCLYR"
    | "BUSINESSCLYR"
    | null;
  plan_id: string | null;
  cl_credits: number | null;
  eleven_labs_credits: number | null;
  open_ai_credits: number | null;
  images: number | null;
}

interface DashboardProps {
  userList: UserData[];
  refetch: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userList, refetch }) => {
  const [filteredList, setFilteredList] = useState<UserData[]>(userList);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isCreationAscending, setIsCreationAscending] = useState<boolean>(true);

  const [isClAscending, setIsClAscending] = useState<boolean>(true);
  const [isElevenLAscending, setIsElevenLAscending] = useState<boolean>(true);
  const [isOpenAiAscending, setIsOpenAiAscending] = useState<boolean>(true);
  const [isImgAscending, setIsImgAiAscending] = useState<boolean>(true);

  const [isAddingPlanId, setIsAddingPlanId] = useState(false);

  const [isExtendingFreeTrial, setIsExtendingFreeTrial] = useState(false);

  const [isCreatedOnAscending, setIsCreatedOnAscending] =
    useState<boolean>(false);

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
  const { mutateAsync: updateStudentClMO } =
    api.user.updateStudentClMO.useMutation({
      onSuccess(data) {
        console.log("Student CL Monthly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Student CL Monthly plan:", error);
      },
    });

  const { mutateAsync: updateCreatorClMO } =
    api.user.updateCreatorClMO.useMutation({
      onSuccess(data) {
        console.log("Creator CL Monthly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Creator CL Monthly plan:", error);
      },
    });

  const { mutateAsync: updateBusinessClMO } =
    api.user.updateBusinessClMO.useMutation({
      onSuccess(data) {
        console.log("Business CL Monthly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Business CL Monthly plan:", error);
      },
    });

  const { mutateAsync: updateStudentClYR } =
    api.user.updateStudentClYR.useMutation({
      onSuccess(data) {
        console.log("Student CL Yearly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Student CL Yearly plan:", error);
      },
    });

  const { mutateAsync: updateCreatorClYR } =
    api.user.updateCreatorClYR.useMutation({
      onSuccess(data) {
        console.log("Creator CL Yearly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Creator CL Yearly plan:", error);
      },
    });

  const { mutateAsync: updateBusinessClYR } =
    api.user.updateBusinessClYR.useMutation({
      onSuccess(data) {
        console.log("Business CL Yearly plan updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating Business CL Yearly plan:", error);
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
      } else if (selectedStatus === "BUSINESS") {
        await updateBusiness({ userId });
      } else if (selectedStatus === "FREE") {
        await cancelSubscription({ userId });
      } else if (selectedStatus === "STUDENT_CL_MO") {
        await updateStudentClMO({ userId });
      } else if (selectedStatus === "CREATOR_CL_MO") {
        await updateCreatorClMO({ userId });
      } else if (selectedStatus === "BUSINESS_CL_MO") {
        await updateBusinessClMO({ userId });
      } else if (selectedStatus === "STUDENT_CL_YR") {
        await updateStudentClYR({ userId });
      } else if (selectedStatus === "CREATOR_CL_YR") {
        await updateCreatorClYR({ userId });
      } else if (selectedStatus === "BUSINESS_CL_YR") {
        await updateBusinessClYR({ userId });
      }
      refetch();
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  }

  return (
    <div className="mb-12 flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <AdminFilters
        setFilteredList={setFilteredList}
        userList={userList}
        filteredList={filteredList}
      />
      <div className="-mt-24 scale-[70%]">
        <div className="flex w-max bg-gray-100">
          <div className="flex w-[220px] min-w-[220px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            Name
          </div>
          <div className="flex w-[330px] min-w-[330px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold ">
            Email
          </div>
          <button
            className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-2 py-2 text-center font-semibold"
            onClick={() =>
              sortHandler({
                filterCreatedAt: true,
                state: isCreatedOnAscending,
                setter: setIsCreatedOnAscending,
                filteredList,
                setFilteredList,
              })
            }
          >
            Create on {isCreatedOnAscending ? "↑" : "↓"}
          </button>
          <div className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            Current Plan
          </div>
          <button
            className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold"
            onClick={() =>
              sortHandler({
                type: "cl_credits",
                state: isClAscending,
                setter: setIsClAscending,
                filteredList,
                setFilteredList,
              })
            }
          >
            CL Credits {isClAscending ? "↑" : "↓"}
          </button>
          <button
            className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold"
            onClick={() =>
              sortHandler({
                type: "eleven_labs_credits",
                state: isElevenLAscending,
                setter: setIsElevenLAscending,
                filteredList,
                setFilteredList,
              })
            }
          >
            11 Credits {isElevenLAscending ? "↑" : "↓"}
          </button>
          <button
            className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold"
            onClick={() =>
              sortHandler({
                type: "open_ai_credits",
                state: isOpenAiAscending,
                setter: setIsOpenAiAscending,
                filteredList,
                setFilteredList,
              })
            }
          >
            OpenAi Credits {isOpenAiAscending ? "↑" : "↓"}
          </button>
          <button
            className="flex w-[100px] min-w-[100px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold"
            onClick={() =>
              sortHandler({
                type: "images",
                state: isImgAscending,
                setter: setIsImgAiAscending,
                filteredList,
                setFilteredList,
              })
            }
          >
            Images {isImgAscending ? "↑" : "↓"}
          </button>
          <button
            onClick={() =>
              sortHandler({
                type: "updated_at",
                state: isAscending,
                setter: setIsAscending,
                filteredList,
                setFilteredList,
              })
            }
            className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold"
          >
            Days with Current Plan {isAscending ? "↑" : "↓"}
          </button>
          <button
            onClick={() =>
              sortHandler({
                type: "created_at",
                state: isCreationAscending,
                setter: setIsCreationAscending,
                filteredList,
                setFilteredList,
              })
            }
            className="flex w-[120px] min-w-[120px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold"
          >
            Days Since Creation {isCreationAscending ? "↑" : "↓"}
          </button>
          <div className="flex w-[200px] min-w-[200px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            Actions
          </div>
          <div className="flex w-[290px] min-w-[290px] items-center justify-center border border-gray-400 px-1 py-2 text-center font-semibold">
            Subscription ID
          </div>
          <div className="flex w-[80px] min-w-[80px] items-center justify-center border border-gray-400 px-4 py-2 text-center font-semibold">
            ID
          </div>
        </div>

        <div className="h-[1200px] w-max overflow-y-scroll border">
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
                <div className="flex w-[100px] min-w-[100px] items-center border px-2 py-2">
                  {user.images}
                </div>
                <div className="flex w-[120px] min-w-[100px] items-center border px-2 py-2">
                  {daysWithCurrentPlan(user.updated_at ?? new Date())}
                </div>
                <div className="flex w-[120px] min-w-[100px] items-center border px-2 py-2">
                  {daysSinceCreated(user.created_at)}
                </div>
                <div className="flex w-[200px] min-w-[200px] items-center justify-center border px-1 py-2">
                  <select
                    value={user?.status ?? ""}
                    onChange={async (e) => {
                      const selectedStatus = e.target.value;
                      if (selectedStatus === "EXTEND") {
                        setSelectedUserId(user.id);
                        return setIsExtendingFreeTrial(true);
                      }

                      await handleSubscription(user.id, selectedStatus);
                    }}
                    className="mr-2 rounded-lg border border-gray-300 px-2 py-1"
                  >
                    <option value="">Select</option>
                    <option value="FREE">Free</option>
                    <option value="FREE_TRIAL">Free Trial 5</option>
                    <option value="STUDENT">Student</option>
                    <option value="CREATOR">Creator</option>
                    <option value="BUSINESS">Business</option>
                    <option value="EXTEND">Extend Free Trial 14</option>
                    <option value="STUDENT_CL_MO">Student (Monthly)</option>
                    <option value="CREATOR_CL_MO">
                      Creator plag (Monthly)
                    </option>
                    <option value="BUSINESS_CL_MO">
                      Business plag(Monthly)
                    </option>
                    <option value="STUDENT_CL_YR">Student plag(Yearly)</option>
                    <option value="CREATOR_CL_YR">Creator plag(Yearly)</option>
                    <option value="BUSINESS_CL_YR">
                      Business plag(Yearly)
                    </option>
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
      {isExtendingFreeTrial && (
        <ExtendFreeTrialModal
          onClose={() => setIsExtendingFreeTrial(false)}
          onConfirm={extendFreeTrial}
          userId={selectedUserId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
