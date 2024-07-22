"use client";

import Image from "next/image";
import Link from "next/link";

export default function TranslatorHeader() {
  return (
    <header className="mt-5 flex w-full items-center justify-between border-b-2 px-2 pb-7 sm:px-4">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/apps/nextjs/public/writer.png"
          className="h-8 w-8 sm:h-12 sm:w-12"
          width={32}
          height={32}
        />
      </Link>
      <div className="flex items-center">
        <div className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2">
          <p className="ml-2 text-2xl font-bold tracking-tight text-gray-700 sm:text-2xl">
            Fast, Fun, and Effective
          </p>
        </div>
      </div>
    </header>
  );
}
