import Link from "next/link";

import ValidateEmailForm from "../validate-email-form";

export default function ValidatePassword() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-1 space-y-6 sm:w-[370px]">
      <div className="flex flex-col space-y-2 text-center  text-[#212121]">
        <h1 className="font-poppins text-2xl font-semibold tracking-tight">
          Reset your Password
        </h1>
        <p className="">
          You will receive a reset password link in your email.
        </p>
      </div>
      <ValidateEmailForm />

      <Link href="/signin" className="text-primary">
        <p className="px-8 text-center text-sm ">Go back to sign in</p>
      </Link>
    </div>
  );
}
