import { useState } from "react";

import { IconArrowRight, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";
import { createUser } from "~/app/signin/actions";

export default function EmailLoginSection({
  type = "demo",
}: {
  type?: string;
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await createUser(values);
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <section
      className={`${type !== "regular" && "py-10"} bg-cp-background  flex w-full justify-center`}
      id="loginForm"
    >
      <div
        className={`${type === "regular" ? "lg:w-[1024px]" : " rounded-xl bg-[#E2E8F0] shadow-md lg:w-[944px]"} flex w-full flex-col items-center p-6  lg:p-10`}
      >
        <h2
          className={`${poppins.className} text-cp-primary text-[32px] font-bold lg:text-[34px]`}
        >
          Where do we send your free access?
        </h2>
        <div
          className={`mt-6 flex w-full flex-col items-center justify-between gap-4 ${type === "regular" ? "lg:flex-row" : "lg:mt-10"} `}
        >
          <div
            className={`flex w-full flex-col ${type !== "regular" && "lg:w-[577px]"} `}
          >
            <label
              htmlFor="name"
              className={`${roboto.className} text-[14px] font-bold text-black`}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              name="name"
              className={`h-[42px] w-full rounded border border-[#898F98] bg-white px-2 ${type === "regular" && "lg:w-[464px]"} `}
            />
          </div>
          <div
            className={`flex w-full flex-col ${type !== "regular" && "lg:w-[577px]"} `}
          >
            <label
              htmlFor="name"
              className={`${roboto.className} text-[14px] font-bold text-black`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              name="email"
              className={`h-[42px] w-full rounded border border-[#898F98] bg-white px-2 ${type === "regular" && "lg:w-[464px]"} `}
            />
          </div>
        </div>
        <Button
          label="Open my inmmediate access!"
          type="accent"
          onClick={async () => await handleLogin()}
          icon={
            loading
              ? () => <IconSpinner className=" animate-spin" />
              : () => <IconArrowRight />
          }
          className={`mt-6 gap-0.5 px-1 lg:gap-2 ${type !== "regular" && "lg:mt-10 lg:w-[577px]"} `}
        />
      </div>
    </section>
  );
}
