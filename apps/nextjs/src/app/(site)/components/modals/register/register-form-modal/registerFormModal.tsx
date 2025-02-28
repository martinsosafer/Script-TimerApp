import { useState } from "react";

import { IconArrowRight, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";
import { createUser } from "~/app/signin/actions";
import Button from "../../../button";

const RegisterFormModal = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await createUser({ ...values, appSumoCode: null });
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:px-16">
      <div className="gap-0.3 flex flex-col">
        <p className="text-left text-[16px] font-bold leading-[22.4px] lg:text-[16px] lg:leading-[28px]">
          Your email
        </p>
        <div>
          <label
            htmlFor="name"
            className={`${roboto.className} text-[11px] font-bold text-white`}
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            name="name"
            className={`h-[38px] w-full rounded border border-[#898F98] bg-white px-2 text-[0.8rem] text-black`}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className={`${roboto.className} text-[11px] font-bold text-white`}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            name="email"
            className={`h-[38px] w-full rounded border border-[#898F98] bg-white px-2 text-[0.8rem] text-black`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          label="Email my immediate access!"
          type="accent"
          onClick={async () => await handleLogin()}
          icon={
            loading
              ? () => <IconSpinner className=" animate-spin" />
              : () => <IconArrowRight />
          }
          height="h-[38px]"
          className="gap-2 text-xs lg:w-full lg:gap-3 lg:px-1 lg:text-base"
        />
      </div>
    </div>
  );
};

export default RegisterFormModal;
