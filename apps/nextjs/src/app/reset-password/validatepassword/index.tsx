import Link from "next/link";

import ValidateEmailForm from "../validate-email-form";

export default function ValidatePassword() {
  return (
    <div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-poppins text-2xl font-semibold tracking-tight">
            Reset your Password
          </h1>
          <p className="text-sm text-black">
            You will receive a reset password link in your email.
          </p>
        </div>
        <ValidateEmailForm />

        <Link href="/signin" className="text-primary">
          <p className="px-8 text-center text-sm ">Go back to sign in</p>
        </Link>
      </div>
    </div>
  );
}
