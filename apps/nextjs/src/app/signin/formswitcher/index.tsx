import Link from "next/link";

export default function FormSwitcher({
  highlightSignUp = false,
  highlightRegister = false,
}) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div className="relative inline-block">
        {/* Log In link */}
        <Link
          href="/signin"
          className={`mr-16 font-poppins font-medium ${
            highlightSignUp ? "text-primary" : "text-slate-500"
          }`}
        >
          Log In
        </Link>

        {/* Sign Up link */}
        <Link
          href="/register"
          className={`ml-16 font-poppins font-medium ${
            highlightRegister ? "text-primary" : "text-slate-500"
          }`}
        >
          Sign Up
        </Link>

        {/* The blue and black lines */}
        <div className="top-full mt-1 flex w-96 justify-center">
          <div
            className={`h-1 flex-grow ${
              highlightSignUp ? "bg-primary" : "bg-slate-500"
            }`}
            style={{ maxWidth: "220px" }}
          ></div>
          <div
            className={`h-1 flex-grow ${
              highlightRegister ? "bg-blue-500" : "bg-slate-500"
            }`}
            style={{ maxWidth: "220px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
