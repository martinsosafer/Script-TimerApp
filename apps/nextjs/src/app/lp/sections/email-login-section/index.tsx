import { useState } from "react";

import { IconArrowRight, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";
import { createUser } from "~/app/signin/actions";

export default function EmailLoginSection() {
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
    <section className="bg-cp-background flex w-full justify-center">
      <div className="flex w-[1024px] flex-col items-center p-10">
        <h2
          className={`${poppins.className} text-cp-primary text-[34px] font-bold`}
        >
          Where do we send your free access?
        </h2>
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex flex-col">
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
              className="h-[42px] w-[464px] rounded border border-[#898F98] bg-white px-2"
            />
          </div>
          <div className="flex flex-col">
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
              className="h-[42px] w-[464px] rounded border border-[#898F98] bg-white px-2"
            />
          </div>
        </div>
        <Button
          label="Open my inmmediate access!"
          type="accent"
          onClick={async () => await handleLogin()}
          icon={
            loading
              ? () => <IconSpinner className="animate-spin" />
              : () => <IconArrowRight />
          }
          className="mt-6"
        />
      </div>
    </section>
  );
}
