import { useRouter } from "next/navigation";

interface Props {
  onSignInOut: () => Promise<void>;
  label: string;
}

export default function SignInOut({ onSignInOut, label }: Props) {
  const router = useRouter();
  return (
    <button
      className="group/signout flex items-center py-2 font-semibold"
      onClick={async () => {
        await onSignInOut();
        if (label === "Sign in") {
          router.push("/signin");
        } else {
          router.push("/");
        }
      }}
    >
      <span className="mr-2 font-poppins group-hover/signout:opacity-60">
        {label}
      </span>
      <svg
        className="stroke-current"
        width="10"
        height="10"
        strokeWidth="2"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <g fillRule="evenodd">
          <path
            className="opacity-0 transition duration-200 ease-in-out group-hover/signout:opacity-60"
            d="M0 5h7"
          ></path>
          <path
            className="opacity-100 transition duration-200 ease-in-out group-hover/signout:translate-x-1 group-hover/signout:transform group-hover/signout:opacity-60"
            d="M1 1l4 4-4 4"
          ></path>
        </g>
      </svg>
    </button>
  );
}
