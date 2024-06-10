import Link from "next/link";

export default function GoToOldChat() {
  return (
    <Link
      className="mt-8 text-xl text-[#0066FF] hover:font-semibold"
      href="/old-chat"
    >
      Go to Old Chat Page -{">"}
    </Link>
  );
}
